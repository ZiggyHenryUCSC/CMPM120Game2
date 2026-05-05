class Play extends Phaser.Scene {
    constructor() {
        super("play");

        this.my = {sprite: {}};

        this.playerStartY = config.height - 100;
        this.playerScale = 3;
        
        this.enemyCount = 10;

        this.waveTime = 10;
        this.waveCounter = 0;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.image("Merp", "merp.png");

        this.load.image("Archer", "archer.png");
        this.load.image("Knight", "knight.png");
        this.load.image("yBullet", "yBullet.png");

        this.my.hitSfx = this.load.audio("hit", 'impactMetal_light_000.ogg');
        this.my.deadSfx = this.load.audio("dead", 'jingles_HIT13.ogg');

        //"Modern", one of the default fonts from https://www.angelcode.com/products/bmfont/
        this.load.bitmapFont("myFont", "myFont_0.png", "myFont.fnt");
    }

    create() {
        this.setupGame();
    }

    setupGame() {
        let sprite = this.my.sprite;

        this.myScore = 0;

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
            sprite.enemies.push(new Knight(this, null, 85 + 30 * i, 100, "Archer"));
            let enemy = sprite.enemies[i];

            enemy.create();
            enemy.angle = 180;

            sprite.bullets.push(enemy.b);
        }
    }

    update(time, delta) {
        let sprite = this.my.sprite;

        if (this.waveCounter >= this.waveTime) {
            this.waveCounter = -1;

            let yLayer = 150;
            for (let i = 0; i < this.enemyCount - 2; i += 1) {
                sprite.enemies.push(new Enemy(this, null, 115 + 30 * i, yLayer, "Knight"));
                let enemy = sprite.enemies[sprite.enemies.length-1];

                enemy.create();
                enemy.angle = 180;

                sprite.bullets.push(enemy.b);
            }
        } else if (this.waveCounter > -0.5) {
            this.waveCounter += delta / 1000;
        }

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

    //credit to Jim Whitehead: https://github.com/JimWhiteheadUCSC/AudioPractice/src/Scenes/ArrayBoom.js
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore(points) {
        this.myScore += points;

        this.my.scoreText.text = "Score: " + this.myScore;

        let total = 0;
        for (let i of this.my.sprite.enemies) {
            total += i.points;
        }
        if (this.myScore >= total) {
            this.scene.start('Win');
        }
    }

    updateHealthText(val) {
        this.my.healthText.text = "Health: " + val;
    }
}
