class Play extends Phaser.Scene {
    constructor() {
        super("play");

        this.my = {sprite: {}};

        this.playerStartY = config.height - 100;
        this.playerScale = 3;
        
        this.enemyCount = 10;

        this.myScore = 0;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.image("Merp", "merp.png");

        this.load.image("Archer", "archer.png");
        this.load.image("Knight", "knight.png");
        this.load.image("yBullet", "yBullet.png");

        //"Modern", one of the default fonts from https://www.angelcode.com/products/bmfont/
        this.load.bitmapFont("myFont", "myFont_0.png", "myFont.fnt");
    }

    create() {
        let sprite = this.my.sprite;

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey("SPACE");

        sprite.player = new Player(this, 
            game.config.width/2, this.playerStartY, this.left, this.right, this.space);
        sprite.player.setScale(this.playerScale);
        sprite.player.create();

        //text
        this.my.scoreText = this.add.bitmapText(250, 20, "myFont", "Score: " + this.myScore);
        this.my.healthText = this.add.bitmapText(20, 20, "myFont", "Health: " + sprite.player.health);

        //enemies
        sprite.enemies = [];
        sprite.bullets = [];
        for (let i = 0; i < this.enemyCount; i += 1) {
            sprite.enemies[i] = new Enemy(this, null, 85 + 30 * i, 100, "Archer");
            let enemy = sprite.enemies[i];

            enemy.create();
            enemy.angle = 180;

            sprite.bullets.push(enemy.b);
        }
    }

    update(time, delta) {
        let sprite = this.my.sprite;

        sprite.player.update(time, delta);
        for (let enemy of sprite.enemies) {
            if (enemy.visible) {
                enemy.update(time, delta);
            }
        }

        /*let xs = [];
        for (let bullet of sprite.bullets) {
            xs.push(bullet.x);
        }*/

        //check if enemy bullets hit player
        let hitPlayer = this.collisionCheck(sprite.player, sprite.bullets);
        if (hitPlayer) {
            hitPlayer.visible = false;

            sprite.player.hit();
            this.updateHealthText(sprite.player.health);
        }

        //check if player bullet hits enemy
        if (sprite.player.b.visible) {
            let hitEnemy = this.collisionCheck(sprite.player.b, sprite.enemies);
            if (hitEnemy) {
                hitEnemy.hit();

                sprite.player.b.visible = false;
            }
        }
        

        //console.log(`fps: ${1000 / delta}`);
    }

    collisionCheck(induvidual, group) {
        group = group.filter((i) => i.visible);

        group.sort(function(a, b) {
            return Math.abs(induvidual.x-a.x) - Math.abs(induvidual.x-b.x);
        });

        for (let i of group) {
            if (this.collides(i, induvidual)) {
                return i;
            }
        }

        return null;
    }

    //credit to Jim Whitehead: https://github.com/JimWhiteheadUCSC/AudioPractice
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore(points) {
        this.myScore += points;

        this.my.scoreText.text = "Score: " + this.myScore;
    }

    updateHealthText(val) {
        this.my.healthText.text = "Health: " + val;
    }
}