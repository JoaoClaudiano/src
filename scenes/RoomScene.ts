import Phaser from "phaser"
import { Player } from "../entities/Player"
import { Enemy } from "../entities/Enemy"
import { Projectile } from "../entities/Projectile"
import { RoomGenerator } from "../procedural/RoomGenerator"

export class RoomScene extends Phaser.Scene {
  player!: Player
  enemies!: Phaser.GameObjects.Group
  projectiles!: Phaser.GameObjects.Group
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  roomCleared = false

  constructor() {
    super("room")
  }

  create() {
    this.player = new Player(this, 400, 300)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.enemies = this.add.group()
    this.projectiles = this.add.group()

    // Colisão projétil ↔ inimigo
    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      (proj: any, enemyObj: any) => {
        if (enemyObj.takeDamage) enemyObj.takeDamage(proj.damage)
        proj.destroy()
      },
      undefined,
      this
    )

    // Colisão player ↔ inimigos
    this.physics.add.overlap(
      this.player,
      this.enemies,
      () => this.restartRoom(),
      undefined,
      this
    )

    // Gera sala procedural
    const runSeed = Math.floor(Math.random() * 999999)
    const generator = new RoomGenerator(runSeed)
    const template = generator.generate()
    this.spawnEnemies(template.enemyCount)
  }

  update() {
    this.player.move(this.cursors)
    this.handleShooting()

    this.enemies.children.iterate((enemyObj: any) => {
      enemyObj.chase(this.player)
    })

    if (!this.roomCleared && this.enemies.countActive(true) === 0) {
      this.clearRoom()
    }
  }

  handleShooting() {
    const dir = new Phaser.Math.Vector2(0, 0)
    if (this.cursors.left?.isDown) dir.x = -1
    else if (this.cursors.right?.isDown) dir.x = 1
    if (this.cursors.up?.isDown) dir.y = -1
    else if (this.cursors.down?.isDown) dir.y = 1
    if (dir.length() > 0) {
      dir.normalize()
      this.player.shoot(dir)
    }
  }

  spawnEnemies(amount: number) {
    for (let i = 0; i < amount; i++) {
      const x = Phaser.Math.Between(100, 700)
      const y = Phaser.Math.Between(100, 500)
      const enemy = new Enemy(this, x, y)
      this.enemies.add(enemy)
    }
  }

  clearRoom() {
    this.roomCleared = true
    console.log("Sala limpa! Portas abertas.")
  }

  restartRoom() {
    this.scene.restart()
  }
}
