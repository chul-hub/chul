const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const messageEl = document.getElementById("message");

const config = {
  brickPadding: 12,
  brickHeight: 26,
  baseBallSpeed: 360,
  paddleSpeed: 520,
  paddleWidth: 160,
  paddleHeight: 18,
  maxPaddleWidth: 260,
  minPaddleWidth: 110,
  ballRadius: 10,
  powerUpChance: 0.25,
  powerUpFallSpeed: 180,
  maxTrailLength: 14,
};

const levelMaps = [
  [
    "0011111100",
    "0112222110",
    "0123333210",
    "0112222110",
    "0011111100",
  ],
  [
    "2100000012",
    "2213333122",
    "2333333332",
    "2213333122",
    "2100000012",
  ],
  [
    "333222333",
    "322101223",
    "210000012",
    "322101223",
    "333222333",
  ],
];

const colors = {
  1: "#7bdff2",
  2: "#b2f7ef",
  3: "#f6f7d7",
  4: "#ffb997",
  strong: "#ff8e3c",
  paddle: "#fef6e4",
  ball: "#ff8e3c",
  trail: "rgba(255, 142, 60, 0.2)",
  backgroundTop: "#070b1f",
  backgroundBottom: "#03060f",
};

const powerUpTypes = [
  { type: "expand", label: "패들 확장", color: "#ff8e3c" },
  { type: "slow", label: "리듬 타임", color: "#9b5de5" },
  { type: "multi", label: "멀티볼", color: "#00bbf9" },
];

const state = {
  levelIndex: 0,
  score: 0,
  lives: 3,
  bricks: [],
  balls: [],
  powerUps: [],
  particles: [],
  paused: false,
  awaitingRestart: false,
  lastTimestamp: 0,
};

const paddle = {
  width: config.paddleWidth,
  height: config.paddleHeight,
  x: canvas.width / 2 - config.paddleWidth / 2,
  y: canvas.height - 60,
  vx: 0,
};

const keys = { left: false, right: false };

function drawRoundedRect({
  x,
  y,
  width,
  height,
  radius = 8,
  fillStyle,
  strokeStyle,
  lineWidth = 1,
}) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  if (fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
}

function updateHud() {
  scoreEl.textContent = state.score.toString();
  livesEl.textContent = state.lives.toString();
  levelEl.textContent = (state.levelIndex + 1).toString();
}

function showMessage(text, duration = 0) {
  messageEl.textContent = text;
  messageEl.style.opacity = text ? "1" : "0";
  if (duration > 0 && text) {
    setTimeout(() => {
      if (!state.paused) {
        messageEl.style.opacity = "0";
      }
    }, duration);
  }
}

function createBricks(levelIndex) {
  const map = levelMaps[levelIndex % levelMaps.length];
  const rows = map.length;
  const cols = map[0].length;
  const totalPaddingX = (cols + 1) * config.brickPadding;
  const brickWidth = (canvas.width - totalPaddingX) / cols;
  const offsetTop = 120;
  const bricks = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const value = Number(map[row][col]);
      if (!Number.isFinite(value) || value <= 0) continue;

      const hits = value === 3 ? 3 : value === 2 ? 2 : 1;
      const x = config.brickPadding + col * (brickWidth + config.brickPadding);
      const y = offsetTop + row * (config.brickHeight + config.brickPadding);
      const shouldDropPower = Math.random() < config.powerUpChance;
      const powerUp = shouldDropPower
        ? powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
        : null;

      bricks.push({
        x,
        y,
        width: brickWidth,
        height: config.brickHeight,
        hits,
        maxHits: hits,
        powerUp,
      });
    }
  }
  return bricks;
}

function spawnBall({ angle = -Math.PI / 3, speed = config.baseBallSpeed } = {}) {
  const direction = { x: Math.cos(angle), y: Math.sin(angle) };
  const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2) || 1;
  state.balls.push({
    x: paddle.x + paddle.width / 2,
    y: paddle.y - config.ballRadius - 2,
    vx: (direction.x / magnitude) * speed,
    vy: (direction.y / magnitude) * speed,
    radius: config.ballRadius,
    trail: [],
  });
}

function resetBalls() {
  state.balls = [];
  spawnBall({ angle: -Math.PI / 4 });
}

function resetPaddle() {
  paddle.width = config.paddleWidth;
  paddle.x = canvas.width / 2 - paddle.width / 2;
}

function resetGame() {
  state.score = 0;
  state.lives = 3;
  state.levelIndex = 0;
  state.awaitingRestart = false;
  state.paused = false;
  state.powerUps = [];
  state.particles = [];
  resetPaddle();
  startLevel();
}

function startLevel() {
  state.bricks = createBricks(state.levelIndex);
  state.powerUps = [];
  state.particles = [];
  resetBalls();
  updateHud();
  showMessage(`레벨 ${state.levelIndex + 1} 시작!`, 1200);
}

function applyPowerUp(power) {
  switch (power.type) {
    case "expand": {
      paddle.width = Math.min(paddle.width + 40, config.maxPaddleWidth);
      showMessage("패들이 넓어졌어요!", 1000);
      break;
    }
    case "slow": {
      state.balls.forEach((ball) => {
        ball.vx *= 0.75;
        ball.vy *= 0.75;
      });
      showMessage("리듬이 느려졌어요!", 1000);
      break;
    }
    case "multi": {
      const newBalls = [];
      state.balls.forEach((ball, index) => {
        const angle = Math.atan2(ball.vy, ball.vx);
        newBalls.push({
          x: ball.x,
          y: ball.y,
          vx: Math.cos(angle + 0.25) * config.baseBallSpeed,
          vy: Math.sin(angle + 0.25) * config.baseBallSpeed,
          radius: config.ballRadius,
          trail: [],
        });
        if (index === 0) {
          newBalls.push({
            x: ball.x,
            y: ball.y,
            vx: Math.cos(angle - 0.25) * config.baseBallSpeed,
            vy: Math.sin(angle - 0.25) * config.baseBallSpeed,
            radius: config.ballRadius,
            trail: [],
          });
        }
      });
      state.balls.push(...newBalls);
      showMessage("멀티볼!", 1000);
      break;
    }
    default:
      break;
  }
}

function createParticles({ x, y, color }) {
  const count = 14 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 80 + Math.random() * 160;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color,
    });
  }
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colors.backgroundTop);
  gradient.addColorStop(1, colors.backgroundBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 80; i += 1) {
    const starX = (Math.sin((state.lastTimestamp / 800 + i) * 1.5) * 0.5 + 0.5) *
      canvas.width;
    const starY = (i / 80) * canvas.height;
    const size = (Math.sin(state.lastTimestamp / 300 + i) * 0.5 + 0.5) * 2 + 1;
    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.4})`;
    ctx.beginPath();
    ctx.arc(starX, starY, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPaddle() {
  const gradient = ctx.createLinearGradient(
    paddle.x,
    paddle.y,
    paddle.x,
    paddle.y + paddle.height,
  );
  gradient.addColorStop(0, "#fef6e4");
  gradient.addColorStop(1, "#f3d2c1");
  drawRoundedRect({
    x: paddle.x,
    y: paddle.y,
    width: paddle.width,
    height: paddle.height,
    radius: 10,
    fillStyle: gradient,
  });
}

function drawBricks() {
  state.bricks.forEach((brick) => {
    const intensity = brick.hits / brick.maxHits;
    const baseColor = brick.maxHits >= 3 ? colors.strong : colors[brick.maxHits];
    const gradient = ctx.createLinearGradient(
      brick.x,
      brick.y,
      brick.x,
      brick.y + brick.height,
    );
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, `rgba(0,0,0,${0.5 - intensity * 0.35})`);

    drawRoundedRect({
      x: brick.x,
      y: brick.y,
      width: brick.width,
      height: brick.height,
      radius: 6,
      fillStyle: gradient,
      strokeStyle: brick.powerUp ? brick.powerUp.color : undefined,
      lineWidth: brick.powerUp ? 2 : 1,
    });
  });
}

function drawBalls(delta) {
  state.balls.forEach((ball) => {
    ball.trail.push({ x: ball.x, y: ball.y, life: 1 });
    if (ball.trail.length > config.maxTrailLength) {
      ball.trail.shift();
    }

    for (let i = 0; i < ball.trail.length; i += 1) {
      const trailPoint = ball.trail[i];
      trailPoint.life -= delta * 0.0025;
      if (trailPoint.life <= 0) continue;
      const size = (i / ball.trail.length) * ball.radius + 1;
      ctx.fillStyle = `rgba(255, 142, 60, ${trailPoint.life * 0.3})`;
      ctx.beginPath();
      ctx.arc(trailPoint.x, trailPoint.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ball.trail = ball.trail.filter((point) => point.life > 0);

    ctx.fillStyle = colors.ball;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPowerUps() {
  state.powerUps.forEach((power) => {
    drawRoundedRect({
      x: power.x,
      y: power.y,
      width: power.size,
      height: power.size,
      radius: 6,
      fillStyle: power.color,
    });

    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.font = "14px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(power.icon, power.x + power.size / 2, power.y + power.size / 2);
  });
}

function drawParticles(delta) {
  ctx.save();
  state.particles.forEach((p) => {
    p.life -= delta * 0.0015;
    p.x += p.vx * (delta / 1000);
    p.y += p.vy * (delta / 1000);
    p.vy += 20 * (delta / 1000);

    if (p.life > 0) {
      ctx.fillStyle = `rgba(255,255,255,${p.life})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, p.life * 4), 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.restore();
  state.particles = state.particles.filter((p) => p.life > 0);
}

function updatePaddle(delta) {
  const direction = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  paddle.vx = direction * config.paddleSpeed;
  paddle.x += paddle.vx * (delta / 1000);
  paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x));
}

function updateBalls(delta) {
  state.balls.forEach((ball) => {
    ball.x += ball.vx * (delta / 1000);
    ball.y += ball.vy * (delta / 1000);

    if (ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx *= -1;
    }
    if (ball.x > canvas.width - ball.radius) {
      ball.x = canvas.width - ball.radius;
      ball.vx *= -1;
    }
    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.vy *= -1;
    }

    // Paddle collision
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.y + ball.radius <= paddle.y + paddle.height + 20 &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width &&
      ball.vy > 0
    ) {
      const relativeIntersect = (ball.x - (paddle.x + paddle.width / 2)) /
        (paddle.width / 2);
      const bounceAngle = relativeIntersect * (Math.PI / 3);
      const speed = Math.sqrt(ball.vx ** 2 + ball.vy ** 2) || config.baseBallSpeed;
      ball.vx = Math.sin(bounceAngle) * speed;
      ball.vy = -Math.cos(bounceAngle) * speed;
      ball.y = paddle.y - ball.radius - 2;
    }
  });

  // Brick collision
  state.balls.forEach((ball) => {
    for (let i = state.bricks.length - 1; i >= 0; i -= 1) {
      const brick = state.bricks[i];
      if (
        ball.x + ball.radius > brick.x &&
        ball.x - ball.radius < brick.x + brick.width &&
        ball.y + ball.radius > brick.y &&
        ball.y - ball.radius < brick.y + brick.height
      ) {
        const overlapLeft = ball.x + ball.radius - brick.x;
        const overlapRight = brick.x + brick.width - (ball.x - ball.radius);
        const overlapTop = ball.y + ball.radius - brick.y;
        const overlapBottom = brick.y + brick.height - (ball.y - ball.radius);
        const minOverlap = Math.min(
          overlapLeft,
          overlapRight,
          overlapTop,
          overlapBottom,
        );

        if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          ball.vx *= -1;
        } else {
          ball.vy *= -1;
        }

        brick.hits -= 1;
        state.score += 50;
        updateHud();
        createParticles({
          x: ball.x,
          y: ball.y,
          color: colors[brick.maxHits] || colors.strong,
        });

        if (brick.hits <= 0) {
          if (brick.powerUp) {
            const icon =
              brick.powerUp.type === "expand"
                ? "⬌"
                : brick.powerUp.type === "slow"
                ? "♪"
                : "◎";
            state.powerUps.push({
              x: brick.x + brick.width / 2 - 16,
              y: brick.y + brick.height / 2 - 16,
              size: 32,
              color: brick.powerUp.color,
              type: brick.powerUp.type,
              label: brick.powerUp.label,
              icon,
            });
          }
          state.bricks.splice(i, 1);
        }
        break;
      }
    }
  });

  state.balls = state.balls.filter((ball) => ball.y - ball.radius <= canvas.height);
}

function updatePowerUps(delta) {
  state.powerUps.forEach((power) => {
    power.y += config.powerUpFallSpeed * (delta / 1000);

    if (
      power.y + power.size >= paddle.y &&
      power.x + power.size >= paddle.x &&
      power.x <= paddle.x + paddle.width
    ) {
      applyPowerUp(power);
      state.powerUps = state.powerUps.filter((p) => p !== power);
    }
  });

  state.powerUps = state.powerUps.filter(
    (power) => power.y <= canvas.height + power.size,
  );
}

function checkBallLoss() {
  if (state.balls.length === 0) {
    state.lives -= 1;
    updateHud();
    if (state.lives <= 0) {
      state.awaitingRestart = true;
      state.paused = true;
      showMessage("게임 오버! R 키로 다시 시작", 0);
    } else {
      resetPaddle();
      showMessage("다시 도전!", 800);
      resetBalls();
    }
  }
}

function checkLevelCleared() {
  if (state.bricks.length === 0) {
    state.levelIndex += 1;
    if (state.levelIndex >= levelMaps.length) {
      showMessage("우주 리듬 마스터! R 키로 새 게임", 0);
      state.awaitingRestart = true;
      state.paused = true;
    } else {
      showMessage("다음 레벨로!", 1000);
      startLevel();
    }
  }
}

function update(delta) {
  if (state.paused) return;

  updatePaddle(delta);
  updateBalls(delta);
  updatePowerUps(delta);
  drawFrame(delta);
  checkBallLoss();
  checkLevelCleared();
}

function drawFrame(delta) {
  drawBackground();
  drawBricks();
  drawBalls(delta);
  drawPaddle();
  drawPowerUps();
  drawParticles(delta);
}

function gameLoop(timestamp) {
  const delta = timestamp - state.lastTimestamp;
  state.lastTimestamp = timestamp;
  update(delta);
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  if (state.awaitingRestart) return;
  state.paused = !state.paused;
  if (state.paused) {
    showMessage("일시 정지", 0);
  } else {
    messageEl.style.opacity = "0";
  }
}

function handleKeyDown(event) {
  if (event.repeat) return;
  if (event.key === "ArrowLeft") keys.left = true;
  if (event.key === "ArrowRight") keys.right = true;

  if (event.code === "Space") {
    event.preventDefault();
    togglePause();
  }

  if (event.code === "KeyR" && state.awaitingRestart) {
    resetGame();
  }
}

function handleKeyUp(event) {
  if (event.key === "ArrowLeft") keys.left = false;
  if (event.key === "ArrowRight") keys.right = false;
}

function handlePointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;
  paddle.x = relativeX - paddle.width / 2;
  paddle.x = Math.max(0, Math.min(canvas.width - paddle.width, paddle.x));
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
canvas.addEventListener("pointermove", handlePointerMove);
canvas.addEventListener("touchmove", (event) => {
  if (event.touches.length > 0) {
    handlePointerMove(event.touches[0]);
  }
  event.preventDefault();
});

window.addEventListener("blur", () => {
  if (!state.paused) {
    togglePause();
  }
});

resetGame();
requestAnimationFrame(gameLoop);
