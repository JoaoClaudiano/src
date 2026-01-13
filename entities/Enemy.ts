import Phaser from "phaser"
import { Player } from "./Player"

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number = 3
  speed: number = 100

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "")

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(20, 20)
    this.setTint(0xff0000)
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
