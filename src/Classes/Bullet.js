class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, velocity) {
        super(scene, x, y, texture, frame);

        this.velocity = velocity; //with direction! up or down

        this.visible = false;

        scene.add.existing(this);
        return this;
    }

    update(time, delta) {
        let dt = delta / 1000;
        this.y -= this.velocity * dt;

        if (this.y < 0) {
            this.visible = false;
        }
    }
}