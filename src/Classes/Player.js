class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, leftKey, rightKey) {
        super(scene, x, y, "Merp", null);
        this.scene = scene;

        this.left = leftKey;
        this.right = rightKey;

        this.speed = 100.0;

        this.bSpeed = 500;
        this.bOffset = 10;
        this.bSprite = "yBullet"

        this.health = 5;

        scene.add.existing(this);
        return this;
    }

    create() {
        this.b = new Bullet(this.scene, this.x, this.y - this.bOffset, this.bSprite, this.bSpeed);

        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //shoot!
        this.space.on('down', () => {
            let b = this.b;

            if (b.visible) {return;}

            b.x = this.x,
            b.y = this.y,
            b.visible = true
        });
    }

    update(time, delta) {
        if (this.b.visible) {
            this.b.update(time, delta);
        }

        let dt = delta * 0.001;

        if (this.left.isDown) {
            if (this.x > this.displayWidth/2) {
                this.x -= this.speed * dt;
            }
        }
            
        if (this.right.isDown) {
            if (this.x < game.config.width - this.displayWidth/2){
                this.x += this.speed * dt;
            }
        }

        let v = (this.speed * dt) / dt;

        if (v != this.speed) {
            //console.log(v);
        }
    }

    hit() {
        this.health -= 1;
        
        if (this.health <= 0) {
            this.Death();
        }
    }

    Death() {
        console.log("Dead")
    }
}