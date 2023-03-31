class GameBoot extends Phaser.Scene {
    constructor() {
        super("gameBoot");
    }

    preload(){
        this.load.image("backpack", "assets/images/backpack.png");
        this.load.image("shop", "assets/images/shop.png");
        this.load.image("cave", "assets/images/cave.png");
        this.load.image("rock", "assets/images/rock.png");
        this.load.image("amethyst", "assets/images/amethyst.png");
        this.load.image("diamond", "assets/images/diamond.png");
        this.load.image("emerald", "assets/images/emerald.png");
        this.load.image("ruby", "assets/images/ruby.png");
        this.load.image("sapphire", "assets/images/sapphire.png");
        this.load.image("topaz", "assets/images/topaz.png");
        this.load.image("coal", "assets/images/coal.png");
        this.load.image("quartz", "assets/images/quartz.png");
        this.load.image("iron", "assets/images/iron.png")

        this.load.audio("rockHit", "assets/sounds/rockHit.mp3");
        this.load.audio("rockHitBreak", "assets/sounds/rockHitBreak.mp3");
        this.load.audio("reward", "assets/sounds/reward.mp3");
        this.load.audio("error", "assets/sounds/error.mp3");
    }

    create(){

        let playerStats = {
            backPackCapacity: 5,
            currentItemCount: 0,
            currentBackpackItems: [],
            pickAxePower: 100,
        }

        let rewards = {
            amethyst: {
                name: "amethyst",
                value: 10
            },
            diamond: {
                name: "diamond",
                value: 10
            },
            emerald: {
                name: "emerald",
                value: 10
            },
            ruby: {
                name: "ruby",
                value: 10
            },
            sapphire: {
                name: "sapphire",
                value: 10
            },
            topaz: {
                name: "topaz",
                value: 10
            },
            coal: {
                name: "coal",
                value: 10
            },
            quartz: {
                name: "quartz",
                value: 10
            },
            iron: {
                name: "iron",
                value: 10
            }
        }

        let gameStats = {
            currentRockHealth: 0,
            rewardOnScreen: {}
        }

        this.registry.set('playerStats', playerStats);
        this.registry.set('rewards', rewards);
        this.registry.set('gameStats', gameStats);

        this.scene.start("mine");
    }
}