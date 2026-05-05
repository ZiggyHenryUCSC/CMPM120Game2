class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.myText = this.add.bitmapText(225, 300, "myFont", 
            "Dang it, I Died!!!!\nCould you press SPACE\nto reset the game for me?", 32).setOrigin(0.5);

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.space.on('down', () => {
            this.scene.start('play');
        });
    }
}