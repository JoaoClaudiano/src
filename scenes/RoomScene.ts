import Phaser from "phaser"
import { Player } from "../entities/Player"
import { Enemy } from "../entities/Enemy"

export class RoomScene extends Phaser.Scene {
  player!: Player
  enemies!: Phaser.GameObjects.Group
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  projectiles!: Phaser.GameObjects.Group

  constructor() { super("room") }

  create() {
    this.player = new Player(this, 400, 300)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.enemies = this.add.group()
    this.projectiles = this.add.group()

    for (let i = 0; i < 5; i++) {
      const enemy = new Enemy(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500))
      this.enemies.add(enemy)
    }

    this.physics.add.overlap(this.projectiles, this.enemies, (_proj: any, enemy: any) => {
      enemy.takeDamage(1)
      _proj.destroy()
    })
  }

  update() {
    this.player.move(this.cursors)
    this.handleShooting()
    this.enemies.children.iterate((e: any) => e.chase(this.player))
  }

  handleShooting() {
    const dir = new Phaser.Math.Vector2(0, 0)
    if (this.cursors.left?.isDown) dir.x = -1
    else if (this.cursors.right?.isDown) dir.x = 1
    if (this.cursors.up?.isDown) dir.y = -1
    else if (this.cursors.down?.isDown) dir.y = 1
    if (dir.length() > 0) { dir.normalize(); this.player.shoot(dir) }
  }
}
