import Phaser from "phaser"
import { Projectile, ProjectileType } from "./Projectile"

export class Player extends Phaser.Physics.Arcade.Sprite {
  speed = 200
  shootCooldown = 300
  lastShot = 0

  // Escolha do tipo de pensamento
  currentProjectile: ProjectileType = "thought"

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "")

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(20, 20)
    this.setTint(0xffffff)
  }

  move(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.setVelocity(0)
    if (cursors.left?.isDown) this.setVelocityX(-this.speed)
    if (cursors.right?.isDown) this.setVelocityX(this.speed)
    if (cursors.up?.isDown) this.setVelocityY(-this.speed)
    if (cursors.down?.isDown) this.setVelocityY(this.speed)
  }

  shoot(direction: Phaser.Math.Vector2) {
    const now = this.scene.time.now
    if (now - this.lastShot < this.shootCooldown) return

    const config = this.currentProjectile
    const speed =  PROJECTILE_TYPES[config].speed

    const proj = new Projectile(
      this.scene,
      this.x,
      this.y,
      direction.x * speed,
      direction.y * speed,
      config
    )

    ;(this.scene as any).projectiles.add(proj)
    this.lastShot = now
  }

  // Alterna entre tipos de pensamentos
  setProjectileType(type: ProjectileType) {
    this.currentProjectile = type
  }
}
