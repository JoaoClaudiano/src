export interface RoomTemplate {
  id: string
  type: "normal" | "elite" | "boss"
  enemyCount: number
  enemyHPModifier: number
}
