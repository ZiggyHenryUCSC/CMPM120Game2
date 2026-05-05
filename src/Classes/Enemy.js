class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, texture);

        this.bulletSprite = "yBullet";
        this.bSpeed = -200;
        this.bOffset = 10;

        this.points = 100;

        this.health = 1;

        this.fireRate = 0.99;

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
            if (Math.random() > this.fireRate) {
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
        this.health -= 1;
        
        if (this.health <= 0) {
            this.Death();
        }
        else {
            this.scaleY = (this.scaleY * 1.15);

            this.scene.sound.play('hit');
        }
    }

    Death() {
        this.b.visible = false;

        this.visible = false;

        this.scene.updateScore(this.points);

        this.scene.sound.play('dead');
    }
}