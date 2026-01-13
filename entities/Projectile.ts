export class Projectile extends Phaser.Physics.Arcade.Image {
  damage: number = 1

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    velocityX: number,
    velocityY: number
  ) {
    super(scene, x, y, "projectile")

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setVelocity(velocityX, velocityY)
    this.setCollideWorldBounds(true)
    this.setBounce(0)
  }
}
