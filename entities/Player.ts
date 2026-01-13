export class Player extends Phaser.Physics.Arcade.Sprite {
  speed = 200

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
}
