class Win extends Phaser.Scene {
    constructor() {
        super("Win");
    }

    create() {
        this.myText = this.add.bitmapText(230, 300, "myFont", 
            "I Won!!!!\nThx for helping me out!\nPress SPACE to\nrestart our journey", 32).setOrigin(0.5);

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.space.on('down', () => {
            this.scene.start('play');
        });
    }
}