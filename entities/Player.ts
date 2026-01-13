import Phaser from "phaser"
import { Projectile } from "./Projectile"

export class Player extends Phaser.Physics.Arcade.Sprite {
  speed = 200
  shootCooldown = 300
  lastShot = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "")

    // Adiciona à cena
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Ajuste de tamanho e cor
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

    const speed = 350

    // Cria o pensamento
    new Projectile(
      this.scene,
      this.x,
      this.y,
      direction.x * speed,
      direction.y * speed
    )

    this.lastShot = now
  }
}
