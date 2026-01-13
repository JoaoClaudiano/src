import Phaser from "phaser"

export type ProjectileType = "thought" | "dream" | "memory" | "doubt"

export interface ProjectileConfig {
  type: ProjectileType
  damage: number
  speed: number
  color: number
  size: number
}


export const PROJECTILE_TYPES: Record<ProjectileType, ProjectileConfig> = {
  thought: { type: "thought", damage: 1, speed: 350, color: 0xffffff, size: 8 },
  dream: { type: "dream", damage: 2, speed: 250, color: 0x00ffff, size: 10 },
  memory: { type: "memory", damage: 1, speed: 300, color: 0xffff00, size: 9 },
  doubt: { type: "doubt", damage: 1, speed: 400, color: 0xff00ff, size: 7 },
}

export class Projectile extends Phaser.Physics.Arcade.Image {
  damage: number
  type: ProjectileType

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    vx: number,
    vy: number,
    type: ProjectileType = "thought"
  ) {
    // Criar um "sprite" circular com Graphics e renderizar como texture
    const config = PROJECTILE_TYPES[type]
    const key = `proj_${type}`

    if (!scene.textures.exists(key)) {
      const g = scene.add.graphics()
      g.fillStyle(config.color, 1)
      g.fillCircle(config.size / 2, config.size / 2, config.size / 2)
      g.generateTexture(key, config.size, config.size)
      g.destroy()
    }

    super(scene, x, y, key)
//danos
    this.type = type
    this.damage = config.damage

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setVelocity(vx, vy)
    this.setCollideWorldBounds(true)
    this.setBounce(0)
  }
}
