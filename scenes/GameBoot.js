class GameBoot extends Phaser.Scene {
    constructor() {
        super("gameBoot");
    }

    preload(){
        this.load.image("backpack", "assets/backpack.png");
        this.load.image("rock", "assets/rock.png");
    }

    create(){
        
        let playerStats = {
            backPackCapacity: 5,
        }

        this.scene.start("mine", { playerStats });
    }
}