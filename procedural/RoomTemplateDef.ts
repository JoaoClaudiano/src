export interface RoomTemplateDef {
  id: string
  type: "normal" | "elite" | "boss"
  enemyCount: number
  enemyHPModifier: number
}
