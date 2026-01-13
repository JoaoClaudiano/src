//import Phaser from "phaser";
import { RoomScene } from "./scenes/RoomScene.js";
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#222222",
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [RoomScene]
};
//novas fases
new Phaser.Game(config);
