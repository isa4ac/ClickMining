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
        this.load.image("coal", "assets/images/coal.png");
        this.load.image("quartz", "assets/images/quartz.png");
        this.load.image("iron", "assets/images/iron.png");
        this.load.image("arrow", "assets/images/arrow.png");

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

        let rocks = {
            rockI: {
                name: "Rock I",
                number: 0,
                maxHealth: 1000,
                possibleRewards: [rewards.coal, rewards.iron, rewards.quartz]
            },
            rockII: {
                name: "Rock II",
                number: 1,
                maxHealth: 5000,
                possibleRewards: [rewards.amethyst, rewards.topaz, rewards.sapphire,]
            },
            rockIII: {
                name: "Rock III",
                number: 2,
                maxHealth: 10000,
                possibleRewards: [rewards.ruby, rewards.emerald,]
            },
            rockIV: {
                name: "Rock IV",
                number: 3,
                maxHealth: 50000,
                possibleRewards: [rewards.diamond]
            }
        }

        let gameStats = {
            currentRock: rocks.rockI,
            currentRockHealth: 0,
            purchasedRocks: [rocks.rockI, rocks.rockII, rocks.rockIII, rocks.rockIV],
            rewardOnScreen: {}
        }

        this.registry.set('playerStats', playerStats);
        this.registry.set('rewards', rewards);
        this.registry.set('gameStats', gameStats);
        this.registry.set('rocks', rocks);

        this.scene.start("mine");
    }
}