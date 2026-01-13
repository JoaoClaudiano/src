export class Enemy extends Phaser.Physics.Arcade.Sprite {
  hp = 3

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "")
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setSize(18, 18)
    this.setTint(0xff3333)
  }

  chase(target: Phaser.GameObjects.Sprite) {
    this.scene.physics.moveToObject(this, target, 60)
  }

  damage() {
    this.hp--
    if (this.hp <= 0) {
      this.destroy()
    }
  }
}
