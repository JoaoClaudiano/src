spawnPowerup() {
  const x = Phaser.Math.Between(100, 700)
  const y = Phaser.Math.Between(100, 500)
  const effect = POWERUPS[
    Phaser.Math.Between(0, POWERUPS.length - 1)
  ]

  const key = `powerup_${effect.type}`

  if (!this.textures.exists(key)) {
    const g = this.add.graphics()
    g.fillStyle(0x00ff00, 1)
    g.fillCircle(10, 10, 10)
    g.generateTexture(key, 20, 20)
    g.destroy()
  }

  const sprite = this.physics.add.image(x, y, key) as any
  sprite.effect = effect

  // Piscar (tween)
  this.tweens.add({
    targets: sprite,
    alpha: { from: 1, to: 0.3 },
    yoyo: true,
    repeat: -1,
    duration: 500,
  })

  this.physics.add.overlap(
    this.player,
    sprite,
    (_player: any, p: any) => {
      this.player.collectPowerup(p.effect)
      p.destroy()
      console.log("Amuleto coletado:", p.effect.type)
    },
    undefined,
    this
  )

  this.powerups.add(sprite)
}
