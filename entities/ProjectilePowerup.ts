import { ProjectileType } from "./Projectile.js"

export type PowerupType =
  | "changeToDream"
  | "changeToMemory"
  | "changeToDoubt"
  | "increaseDamage"
  | "increaseSpeed"
  | "decreaseCooldown"

export interface PowerupEffect {
  type: PowerupType
  apply: (player: any) => void
}

// Lista de amuletos
export const POWERUPS: PowerupEffect[] = [
  {
    type: "changeToDream",
    apply: (player) => {
      player.setProjectileType("dream")
    },
  },
  {
    type: "changeToMemory",
    apply: (player) => {
      player.setProjectileType("memory")
    },
  },
  {
    type: "changeToDoubt",
    apply: (player) => {
      player.setProjectileType("doubt")
    },
  },
  {
    type: "increaseDamage",
    apply: (player) => {
      // Aumenta o dano base do projétil atual
      const currentType = player.currentProjectile
      player.projectileDamageBonus =
        (player.projectileDamageBonus || 0) + 1
    },
  },
  {
    type: "increaseSpeed",
    apply: (player) => {
      player.projectileSpeedBonus =
        (player.projectileSpeedBonus || 0) + 50
    },
  },
  {
    type: "decreaseCooldown",
    apply: (player) => {
      player.shootCooldown = Math.max(50, player.shootCooldown - 50)
    },
  },
]
