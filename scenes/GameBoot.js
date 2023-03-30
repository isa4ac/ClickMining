class GameBoot extends Phaser.Scene {
    constructor() {
        super("gameBoot");
    }

    preload(){
        this.load.image("backpack", "assets/backpack.png");
        this.load.image("shop", "assets/shop.png");
        this.load.image("cave", "assets/cave.png");
        this.load.image("rock", "assets/rock.png");
        this.load.image("sellButton", "assets/sell.png");
        this.load.image("coins", "assets/coins.png");
    }

    create(){
        
        let playerStats = {
            backPackCapacity: 5,
        }

        this.scene.start("mine", { playerStats });
    }
}