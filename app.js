import * as THREE from "https://cdn.skypack.dev/three@0.159.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.159.0/examples/jsm/controls/OrbitControls.js";

const container = document.querySelector("#scene");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05060a);

const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  2000
);
camera.position.set(0, 140, 380);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 80;
controls.maxDistance = 650;
controls.maxPolarAngle = Math.PI * 0.85;

const ambientLight = new THREE.AmbientLight(0x556677, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffddaa, 1.4, 0, 2);
sunLight.castShadow = false;
scene.add(sunLight);

const sunGeometry = new THREE.SphereGeometry(16, 48, 48);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffb347,
  emissive: 0xff8c00,
  emissiveIntensity: 1.1,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planets = [
  { name: "Mercury", color: 0xc0c0c0, size: 2.5, distance: 28, speed: 0.022 },
  { name: "Venus", color: 0xe0c29c, size: 3.8, distance: 40, speed: 0.017 },
  { name: "Earth", color: 0x4e8df5, size: 4, distance: 52, speed: 0.015 },
  { name: "Mars", color: 0xd95b3f, size: 3, distance: 65, speed: 0.013 },
  { name: "Jupiter", color: 0xd9b28c, size: 7.5, distance: 85, speed: 0.009 },
  { name: "Saturn", color: 0xdcc7a1, size: 6.2, distance: 110, speed: 0.007 },
  { name: "Uranus", color: 0x8cd7f5, size: 5, distance: 130, speed: 0.005 },
  { name: "Neptune", color: 0x4f7dd8, size: 5.1, distance: 150, speed: 0.004 },
  { name: "Pluto", color: 0xb9a38f, size: 1.8, distance: 165, speed: 0.003 },
];

const orbits = [];

const stars = new THREE.BufferGeometry();
const starCount = 1200;
const starVertices = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i += 3) {
  starVertices[i] = THREE.MathUtils.randFloatSpread(1500);
  starVertices[i + 1] = THREE.MathUtils.randFloatSpread(1500);
  starVertices[i + 2] = THREE.MathUtils.randFloatSpread(1500);
}
stars.setAttribute("position", new THREE.BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
scene.add(new THREE.Points(stars, starMaterial));

function createOrbitPath(distance) {
  const curvePoints = 128;
  const points = [];
  for (let i = 0; i < curvePoints; i++) {
    const theta = (i / curvePoints) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * distance, 0, Math.sin(theta) * distance));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x1f2a3f, transparent: true, opacity: 0.45 });
  const line = new THREE.LineLoop(geometry, material);
  line.rotation.x = Math.PI / 2;
  scene.add(line);
}

planets.forEach((planet) => {
  createOrbitPath(planet.distance);

  const planetGeometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const planetMaterial = new THREE.MeshStandardMaterial({
    color: planet.color,
    roughness: 0.7,
    metalness: 0.1,
  });

  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.castShadow = false;
  planetMesh.receiveShadow = false;

  const orbitGroup = new THREE.Group();
  planetMesh.position.x = planet.distance;
  orbitGroup.add(planetMesh);

  if (planet.name === "Saturn") {
    const ringGeometry = new THREE.RingGeometry(8, 12, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7c4a0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.1;
    ring.position.copy(planetMesh.position);
    orbitGroup.add(ring);
  }

  scene.add(orbitGroup);
  orbits.push({ group: orbitGroup, speed: planet.speed, spin: planetMesh });
});

function resizeRenderer() {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

window.addEventListener("resize", resizeRenderer);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  orbits.forEach(({ group, speed, spin }) => {
    group.rotation.y += speed * delta * 60;
    spin.rotation.y += 0.015;
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();
