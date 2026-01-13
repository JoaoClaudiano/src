import Phaser from "phaser"
import { RoomScene } from "./scenes/RoomScene"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [RoomScene],
}

new Phaser.Game(config)
