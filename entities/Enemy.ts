import Phaser from "phaser"
import { Player } from "./Player"

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number = 3
  speed: number = 100

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Criar sprite circular para inimigo
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
    if (this.health <= 0) this.destroy()
  }

  chase(player: Player) {
    if (!this.active || !player.active) return

    const dir = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y)
    dir.normalize()
    this.setVelocity(dir.x * this.speed, dir.y * this.speed)
  }
}
