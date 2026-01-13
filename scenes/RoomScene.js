import { Player } from "../entities/Player.js";
import { Enemy } from "../entities/Enemy.js";
export class RoomScene extends Phaser.Scene {
    
    //construir novas salas
    constructor() { super("room"); }
    create() {
        this.player = new Player(this, 400, 300);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enemies = this.add.group();
        this.projectiles = this.add.group();
        for (let i = 0; i < 5; i++) {
            const enemy = new Enemy(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
            this.enemies.add(enemy);
        }
        this.physics.add.overlap(this.projectiles, this.enemies, (_proj, enemy) => {
            enemy.takeDamage(1);
            _proj.destroy();
        });
    }
    update() {
        this.player.move(this.cursors);
        this.handleShooting();
        this.enemies.children.iterate((e) => e.chase(this.player));
    }
    handleShooting() {
        var _a, _b, _c, _d;
        const dir = new Phaser.Math.Vector2(0, 0);
        if ((_a = this.cursors.left) === null || _a === void 0 ? void 0 : _a.isDown)
            dir.x = -1;
        else if ((_b = this.cursors.right) === null || _b === void 0 ? void 0 : _b.isDown)
            dir.x = 1;
        if ((_c = this.cursors.up) === null || _c === void 0 ? void 0 : _c.isDown)
            dir.y = -1;
        else if ((_d = this.cursors.down) === null || _d === void 0 ? void 0 : _d.isDown)
            dir.y = 1;
        if (dir.length() > 0) {
            dir.normalize();
            this.player.shoot(dir);
        }
    }
}
