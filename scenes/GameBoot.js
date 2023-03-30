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
        this.load.image("amethyst", "assets/amethyst.png");
        this.load.image("diamond", "assets/diamond.png");
        this.load.image("emerald", "assets/emerald.png");
        this.load.image("ruby", "assets/ruby.png");
        this.load.image("sapphire", "assets/sapphire.png");
        this.load.image("topaz", "assets/topaz.png");
        this.load.image("pickaxe", "assets/pickaxe.png");

        this.load.audio("rockHit", "assets/rockHit.mp3");
        this.load.audio("rockHitBreak", "assets/rockHitBreak.mp3");
        this.load.audio("reward", "assets/reward.mp3");
        this.load.audio("error", "assets/error.mp3");
    }

    create(){

        let playerStats = {
            backPackCapacity: 5,
            currentItemCount: 0,
            currentBackpackitems: [],
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
        }

        this.scene.start("mine", { playerStats, rewards });
    }
}