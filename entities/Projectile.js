export class Projectile extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, vx, vy) {
        const key = "proj_thought";
        if (!scene.textures.exists(key)) {
            const g = scene.add.graphics();
            g.fillStyle(0xffffff, 1);
            g.fillCircle(4, 4, 4);
            g.generateTexture(key, 8, 8);
            g.destroy();
        }
        super(scene, x, y, key);
        this.damage = 1;
        this.type = "thought";
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setVelocity(vx, vy);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.tween = scene.tweens.add({
            targets: this,
            scale: { from: 1, to: 1.4 },
            yoyo: true,
            repeat: -1,
            duration: 200,
        });
    }
    destroy(fromScene) {
        if (this.tween)
            this.tween.stop();
        super.destroy(fromScene);
    }
}
