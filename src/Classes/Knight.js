class Knight extends Enemy {
    constructor(scene, path, x, y, texture) {
        super(scene, path, x, y, texture);

        this.health = 2;
        this.points = 150;

        this.fireRate = 0.999;
    }
} 