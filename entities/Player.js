import { Projectile } from "./Projectile.js";
//criar os playes
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "");
        this.speed = 200;
        this.shootCooldown = 300;
        this.lastShot = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setSize(20, 20);
        this.setTint(0xffffff);
    }
    move(cursors) {
        var _a, _b, _c, _d;
        this.setVelocity(0);
        if ((_a = cursors.left) === null || _a === void 0 ? void 0 : _a.isDown)
            this.setVelocityX(-this.speed);
        if ((_b = cursors.right) === null || _b === void 0 ? void 0 : _b.isDown)
            this.setVelocityX(this.speed);
        if ((_c = cursors.up) === null || _c === void 0 ? void 0 : _c.isDown)
            this.setVelocityY(-this.speed);
        if ((_d = cursors.down) === null || _d === void 0 ? void 0 : _d.isDown)
            this.setVelocityY(this.speed);
    }
    shoot(direction) {
        const now = this.scene.time.now;
        if (now - this.lastShot < this.shootCooldown)
            return;
        const speed = 350;
        const proj = new Projectile(this.scene, this.x, this.y, direction.x * speed, direction.y * speed);
        this.scene.projectiles.add(proj);
        this.lastShot = now;
    }
}
