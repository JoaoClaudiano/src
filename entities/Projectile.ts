import Phaser from "phaser"

export type ProjectileType = "thought"

export class Projectile extends Phaser.Physics.Arcade.Image {
  damage: number = 1
  type: ProjectileType = "thought"
  tween!: Phaser.Tweens.Tween

  constructor(scene: Phaser.Scene, x: number, y: number, vx: number, vy: number) {
    const key = "proj_thought"
    if (!scene.textures.exists(key)) {
      const g = scene.add.graphics()
      g.fillStyle(0xffffff, 1)
      g.fillCircle(4, 4, 4)
      g.generateTexture(key, 8, 8)
      g.destroy()
    }

    super(scene, x, y, key)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setVelocity(vx, vy)
    this.setCollideWorldBounds(true)
    this.setBounce(0)

    this.tween = scene.tweens.add({
      targets: this,
      scale: { from: 1, to: 1.4 },
      yoyo: true,
      repeat: -1,
      duration: 200,
    })
  }

  destroy(fromScene?: boolean) {
    if (this.tween) this.tween.stop()
    super.destroy(fromScene)
  }
}
