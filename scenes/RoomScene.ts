import { Player } from "../entities/Player"
import { Enemy } from "../entities/Enemy"

export class RoomScene extends Phaser.Scene {
  player!: Player
  enemies!: Phaser.GameObjects.Group
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  roomCleared = false

  constructor() {
    super("room")
  }

  create() {
    // Player
    this.player = new Player(this, 400, 300)

    // Input
    this.cursors = this.input.keyboard.createCursorKeys()

    // Enemies
    this.enemies = this.add.group()
    this.spawnEnemies(4)

    // Colisão player ↔ inimigos
    this.physics.add.overlap(
      this.player,
      this.enemies,
      () => this.restartRoom(),
      undefined,
      this
    )
  }

  update() {
    this.player.move(this.cursors)

    this.enemies.children.iterate((enemyObj: any) => {
      enemyObj.chase(this.player)
    })

    if (!this.roomCleared && this.enemies.countActive(true) === 0) {
      this.clearRoom()
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
