import Phaser from "phaser"

export type ProjectileType = "thought" | "dream" | "memory" | "doubt"

export interface ProjectileConfig {
  type: ProjectileType
  damage: number
  speed: number
}

export const PROJECTILE_TYPES: Record<ProjectileType, ProjectileConfig> = {
  thought: { type: "thought", damage: 1, speed: 350 },
  dream: { type: "dream", damage: 2, speed: 250 },
  memory: { type: "memory", damage: 1, speed: 300 },
  doubt: { type: "doubt", damage: 1, speed: 400 },
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
    super(scene, x, y, "projectile")

    this.type = type
    this.damage = PROJECTILE_TYPES[type].damage

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setVelocity(vx, vy)
    this.setCollideWorldBounds(true)
    this.setBounce(0)

    // Diferencia visual por tipo
    switch (type) {
      case "thought":
        this.setTint(0xffffff)
        break
      case "dream":
        this.setTint(0x00ffff)
        break
      case "memory":
        this.setTint(0xffff00)
        break
      case "doubt":
        this.setTint(0xff00ff)
        break
    }
  }
}
