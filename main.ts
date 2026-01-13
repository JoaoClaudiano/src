import Phaser from "phaser"
import { RoomScene } from "./scenes/RoomScene"

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#0d0d0d",
  physics: {
    default: "arcade",
    arcade: { debug: false }
  },
  scene: [RoomScene]
})
