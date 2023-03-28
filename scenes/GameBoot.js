class GameBoot extends Phaser.Scene {
    constructor() {
        super("gameBoot");
    }

    preload(){
        this.load.image("backpack", "assets/backpack.png");
        this.load.image("shop", "assets/shop.png");
    }

    create(){
        this.scene.start("mine");
    }
}