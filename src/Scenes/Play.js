class Play extends Phaser.Scene {
    constructor() {
        super("play");

        this.my = {sprite: {}};

        this.playerStartY = config.height - 100;
        this.playerScale = 3;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.image("Merp", "merp.png");
    }

    create() {
        let sprite = this.my.sprite;

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey("SPACE");

        sprite.player = new Player(this, 
            game.config.width/2, this.playerStartY, "Merp", null, this.left, this.right, this.space);
        sprite.player.setScale(this.playerScale);
        sprite.player.create();
    }

    update(time, delta) {
        this.my.sprite.player.update(time, delta);
    }
}