class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, texture);

        this.bulletSprite = "yBullet";
        this.bSpeed = -200;
        this.bOffset = 10;

        this.points = 100;

        scene.add.existing(this);
        return this;
    }

    create() {
        this.b = new Bullet(this.scene, this.x, this.y + this.bOffset, this.bulletSprite, this.bSpeed);
        this.b.visible = false;
    }

    update(time, delta) {
        if (this.b.visible) {
            this.b.update(time, delta);
        } else {
            if (Math.random() > 0.999) {
                this.shoot();
            }
        }
    }

    shoot() {
        let b = this.b;

        if (b.visible) {return;}

        b.x = this.x,
        b.y = this.y,
        b.visible = true
    }

    hit() {
        this.Death();
    }

    Death() {
        this.b.visible = false;

        this.visible = false;

        this.scene.updateScore(this.points);
    }
}