import Phaser from "phaser"
import { Player } from "./Player"

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number = 3
  speed: number = 100

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "")

    // Adiciona à cena
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Ajustes visuais
    this.setSize(20, 20)
    this.setTint(0xff0000)
    this.setCollideWorldBounds(true)
  }

  // Método chamado quando inimigo leva dano
  takeDamage(amount: number) {
    this.health -= amount
    if (this.health <= 0) {
      this.destroy()
    }
  }

  // Movimento simples para perseguir o player
  chase(player: Player) {
    if (!this.active || !player.active) return

    const direction = new Phaser.Math.Vector2(
      player.x - this.x,
      player.y - this.y
    )
    direction.normalize()

    this.setVelocity(direction.x * this.speed, direction.y * this.speed)
  }
}
