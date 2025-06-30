import pygame
import random
import sys

# Game settings
SCREEN_WIDTH = 480
SCREEN_HEIGHT = 640
PLAYER_SPEED = 5
BULLET_SPEED = 7
ENEMY_SPEED = 3
ENEMY_SPAWN_TIME = 1000  # milliseconds


class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 40))
        self.image.fill((0, 255, 0))
        self.rect = self.image.get_rect(midbottom=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - 10))
        self.speed = PLAYER_SPEED

    def update(self, pressed):
        if pressed[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if pressed[pygame.K_RIGHT] and self.rect.right < SCREEN_WIDTH:
            self.rect.x += self.speed


class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((5, 10))
        self.image.fill((255, 255, 0))
        self.rect = self.image.get_rect(midbottom=(x, y))
        self.speed = BULLET_SPEED

    def update(self):
        self.rect.y -= self.speed
        if self.rect.bottom < 0:
            self.kill()


class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 30))
        self.image.fill((255, 0, 0))
        x = random.randint(20, SCREEN_WIDTH - 20)
        self.rect = self.image.get_rect(midtop=(x, -20))
        self.speed = ENEMY_SPEED

    def update(self):
        self.rect.y += self.speed
        if self.rect.top > SCREEN_HEIGHT:
            self.kill()


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Plane Game")
    clock = pygame.time.Clock()

    player = Player()
    player_group = pygame.sprite.Group(player)
    bullet_group = pygame.sprite.Group()
    enemy_group = pygame.sprite.Group()

    pygame.time.set_timer(pygame.USEREVENT, ENEMY_SPAWN_TIME)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                bullet = Bullet(player.rect.centerx, player.rect.top)
                bullet_group.add(bullet)
            if event.type == pygame.USEREVENT:
                enemy = Enemy()
                enemy_group.add(enemy)

        pressed = pygame.key.get_pressed()
        player_group.update(pressed)
        bullet_group.update()
        enemy_group.update()

        # Collision detection
        pygame.sprite.groupcollide(bullet_group, enemy_group, True, True)
        if pygame.sprite.spritecollideany(player, enemy_group):
            running = False

        # Drawing
        screen.fill((0, 0, 0))
        player_group.draw(screen)
        bullet_group.draw(screen)
        enemy_group.draw(screen)
        pygame.display.flip()
        clock.tick(60)

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()
