import Phaser from "phaser"
import { Player } from "./Player"

//inimigos criados
export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number = 3
  speed: number = 100

  constructor(scene: Phaser.Scene, x: number, y: number) {
    const key = "enemy_basic"
    if (!scene.textures.exists(key)) {
      const g = scene.add.graphics()
      g.fillStyle(0xff0000, 1)
      g.fillCircle(10, 10, 10)
      g.generateTexture(key, 20, 20)
      g.destroy()
    }

    super(scene, x, y, key)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)
  }

  takeDamage(amount: number) {
    this.health -= amount
    const particles = this.scene.add.particles("whitePixel")
    const emitter = particles.createEmitter({
      x: this.x,
      y: this.y,
      speed: { min: -50, max: 50 },
      scale: { start: 0.3, end: 0 },
      lifespan: 300,
      quantity: 5,
      tint: 0xff0000,
    })
    this.scene.time.delayedCall(300, () => particles.destroy())
    if (this.health <= 0) this.destroy()
  }

  chase(player: Player) {
    if (!this.active || !player.active) return
    const dir = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)
    dir.normalize()
    this.setVelocity(dir.x * this.speed, dir.y * this.speed)
  }
}
