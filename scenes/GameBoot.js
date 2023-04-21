class GameBoot extends Phaser.Scene {
  constructor() {
    super('gameBoot')
  }

  preload() {
    this.load.image('backpack', 'assets/images/backpack.png')
    this.load.image('shop', 'assets/images/shop.png')
    this.load.image('cave', 'assets/images/cave.png')
    this.load.image('rock', 'assets/images/rock.png')
    this.load.image('sellButton', 'assets/images/sell.png')
    this.load.image('coins', 'assets/images/coins.png')
    this.load.image('amethyst', 'assets/images/amethyst.png')
    this.load.image('diamond', 'assets/images/diamond.png')
    this.load.image('emerald', 'assets/images/emerald.png')
    this.load.image('ruby', 'assets/images/ruby.png')
    this.load.image('sapphire', 'assets/images/sapphire.png')
    this.load.image('topaz', 'assets/images/topaz.png')
    this.load.image('pickaxe', 'assets/images/pickaxe.png')
    this.load.image('coal', 'assets/images/coal.png')
    this.load.image('quartz', 'assets/images/quartz.png')
    this.load.image('iron', 'assets/images/iron.png')
    this.load.image('arrow', 'assets/images/arrow.png')
    this.load.image('caveBG', 'assets/images/caveBG.png')
    this.load.image('backpackBG', 'assets/images/backpackBG.png')
    this.load.image('shopBG', 'assets/images/shopBG.png')

    this.load.audio('rockHit', 'assets/sounds/rockHit.mp3')
    this.load.audio('rockHitBreak', 'assets/sounds/rockHitBreak.mp3')
    this.load.audio('reward', 'assets/sounds/reward.mp3')
    this.load.audio('error', 'assets/sounds/error.mp3')
    this.load.audio('backpackOpen', 'assets/sounds/backpackOpen.mp3')
    this.load.audio('mineOpen', 'assets/sounds/mineOpen.mp3')
    this.load.audio('shopOpen', 'assets/sounds/shopOpen.mp3')
    this.load.audio('buy', 'assets/sounds/buy.mp3')
    this.load.audio('sell', 'assets/sounds/sell.mp3')
  }

  create() {
    let playerStats = {
      backPackCapacity: 5,
      currentItemCount: 0,
      currentBackpackItems: [],
      pickAxePower: 100,
      autoMinerDamage: 100,
      autoMinerSpeed: 5000,
      coins: 200,
    }

    let rewards = {
      amethyst: {
        name: 'amethyst',
        value: 10,
      },
      diamond: {
        name: 'diamond',
        value: 10,
      },
      emerald: {
        name: 'emerald',
        value: 10,
      },
      ruby: {
        name: 'ruby',
        value: 10,
      },
      sapphire: {
        name: 'sapphire',
        value: 10,
      },
      topaz: {
        name: 'topaz',
        value: 10,
      },
      coal: {
        name: 'coal',
        value: 10,
      },
      quartz: {
        name: 'quartz',
        value: 10,
      },
      iron: {
        name: 'iron',
        value: 10,
      },
    }

    let rocks = {
      rockI: {
        name: 'Rock I',
        number: 0,
        maxHealth: 1000,
        possibleRewards: [rewards.coal, rewards.iron, rewards.quartz],
      },
      rockII: {
        name: 'Rock II',
        number: 1,
        maxHealth: 5000,
        possibleRewards: [rewards.amethyst, rewards.topaz, rewards.sapphire],
        price: 30,
      },
      rockIII: {
        name: 'Rock III',
        number: 2,
        maxHealth: 10000,
        possibleRewards: [rewards.ruby, rewards.emerald],
        price: 60,
      },
      rockIV: {
        name: 'Rock IV',
        number: 3,
        maxHealth: 50000,
        possibleRewards: [rewards.diamond],
        price: 100,
      },
    }

    let gameStats = {
      currentScene: 'mine',
      currentRock: rocks.rockI,
      currentRockHealth: 0,
      purchasedRocks: [rocks.rockI],
      rewardOnScreen: {},
    }

    DataManager.save('playerStats', playerStats)
    DataManager.save('rewards', rewards)
    DataManager.save('gameStats', gameStats)
    DataManager.save('rocks', rocks)

    var currentScene = DataManager.load('gameStats').currentScene
    if (currentScene == 'mine') {
      this.scene.start('mine')
    } else {
      this.scene.start(currentScene)
    }
  }
}
