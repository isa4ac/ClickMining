class Shop extends Phaser.Scene {
  constructor() {
    super("shop");
  }

  init() {
    this.playerStats = DataManager.load('playerStats');
    this.gameStats = DataManager.load('gameStats');
    this.toolbar;

    this.PAPowerInterval = 50;
    this.BackpackInterval = 5;
    this.AMPowerInterval = 25;
    this.AMTimeInterval = 100;

    this.rowHeight = 60;
    this.rowSpacing = 10;
    this.menuData = [];
  }

  buyAutoMiner() {
    if (this.playerStats.coins >= 350) {
      this.playerStats.coins = this.playerStats.coins - 350;
      this.gameStats.purchasedAutoMiner = true;
      this.buySound = this.sound.add('buy');
      this.buySound.play();
      DataManager.update('playerStats', this.playerStats);
      DataManager.update('gameStats', this.gameStats);
      this.displayMenu();
      this.toolbar.display();
    }
  }

  sellItems() {
    var backpackItems = this.playerStats.currentBackpackItems;
    if (backpackItems.length > 0) {
      for (var i = backpackItems.length - 1; i >= 0; i--) {
        this.playerStats.coins = this.playerStats.coins + backpackItems[i].value;
        backpackItems.pop(i);
      }
      this.playerStats.currentBackpackItems = backpackItems;
      DataManager.update('playerStats', this.playerStats);
      this.sellSound = this.sound.add('sell');
      this.sellSound.play();
      this.toolbar.display();
    }
  }

  convertToRoman(num) {
    const romanNumerals = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };

    let roman = '';

    for (let key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        roman += key;
        num -= romanNumerals[key];
      }
    }

    return roman;
  }

  upgrade(key) {
    // incrementUpgrade / take coins
    this.incrementUpgrade(key);

    // update labels, pickaxe power, coins
    DataManager.update('playerStats', this.playerStats);
    this.displayMenu();
    this.toolbar.display();
  }

  getPrice(key) {
    if (key === "pickaxeUpgrade") {
      let pickAxePower = this.playerStats.pickAxePower;
      return Math.floor((1.15 * pickAxePower) / 10)
    } else if (key === "backpackUpgrade") {
      let backPackCapacity = this.playerStats.backPackCapacity;
      return Math.floor((1.15 * backPackCapacity) * 2)
    } else if (key === "autoMinerDamageUpgrade") {
      let autoMinerDamage = this.playerStats.autoMinerDamage;
      return Math.floor((1.15 * autoMinerDamage) / 5)
    } else if (key === "autoMinerSpeedUpgrade") {
      let autoMinerSpeed = this.playerStats.autoMinerSpeed;
      return Math.floor((1.15 * (5000-(autoMinerSpeed-100))) / 10)
    }
  }

  incrementUpgrade(key) {
    this.buySound = this.sound.add('buy');
    if (key === "pickaxeUpgrade") {
      if (this.playerStats.coins >= this.getPrice(key)) {
        this.playerStats.coins = this.playerStats.coins - this.getPrice(key);
        this.playerStats.pickAxePower = this.playerStats.pickAxePower + this.PAPowerInterval;
        this.buySound.play();
      }
    } else if (key === "backpackUpgrade") {
      if (this.playerStats.coins >= this.getPrice(key)) {
        this.playerStats.coins = this.playerStats.coins - this.getPrice(key);
        this.playerStats.backPackCapacity = this.playerStats.backPackCapacity + this.BackpackInterval;
        this.buySound.play();
      }
    } else if (key === "autoMinerDamageUpgrade") {
      if (this.playerStats.coins >= this.getPrice(key)) {
        this.playerStats.coins = this.playerStats.coins - this.getPrice(key);
        this.playerStats.autoMinerDamage = this.playerStats.autoMinerDamage + this.AMPowerInterval;
        this.buySound.play();
      }
    } else if (key === "autoMinerSpeedUpgrade") {
      if (this.playerStats.coins >= this.getPrice(key)) {
        this.playerStats.coins = this.playerStats.coins - this.getPrice(key);
        this.playerStats.autoMinerSpeed = this.playerStats.autoMinerSpeed - this.AMTimeInterval;
        this.buySound.play();
      }
    }
  }

  getSublabel(key) {
    if (key === "pickaxeUpgrade") {
      return `+${this.PAPowerInterval} Pickaxe Power (${this.playerStats.pickAxePower + this.PAPowerInterval})`
    } else if (key === "backpackUpgrade") {
      return `+${this.BackpackInterval} Backpack Space (${this.playerStats.backPackCapacity + this.BackpackInterval})`
    } else if (key === "autoMinerDamageUpgrade") {
      return `+${this.AMPowerInterval} Auto Miner Power (${this.playerStats.autoMinerDamage + this.AMPowerInterval})`
    } else if (key === "autoMinerSpeedUpgrade") {
      if (this.playerStats.autoMinerSpeed >= 500) {
        return `+${this.AMTimeInterval/1000} Second Auto Miner Speed (${(this.playerStats.autoMinerSpeed - this.AMTimeInterval) / 1000}s)`
      } else {
        return 'Max Autominer Speed Reached! (0.5s)'
      }
    }
  }

  displayMenu() {
    this.menuData.splice(0, this.menuData.length);
    this.menuData.push({ label: `Pickaxe Upgrade Tier ${this.convertToRoman(((this.playerStats.pickAxePower) / this.PAPowerInterval) + 1)}`, key: "pickaxeUpgrade" }) // + 100 Per Tier
    this.menuData.push({ label: `Backpack Upgrade Tier ${this.convertToRoman(((this.playerStats.backPackCapacity) / this.BackpackInterval) + 1)}`, key: "backpackUpgrade" }) // + 5 Per Tier
    if (this.gameStats.purchasedAutoMiner) {
      this.menuData.push({ label: `Auto Miner Damage Tier ${this.convertToRoman(((this.playerStats.autoMinerDamage) / this.AMPowerInterval) + 1)}`, key: "autoMinerDamageUpgrade" }) // + 50 Per Tier
      this.menuData.push({ label: `Auto Miner Speed Tier ${this.convertToRoman(((5000-(this.playerStats.autoMinerSpeed - this.AMTimeInterval)) / 100) + 1)}`, key: "autoMinerSpeedUpgrade" }) // - .1  Seconds Per Tier
    }
    // Create a new container for the menu
    var menuContainer = this.add.container(150, 140);
    // Loop through the data and create a new row for each item
    for (var i = 0; i < this.menuData.length; i++) {
      // Create a new row container for this item
      var rowContainer = this.add.container(0, (this.rowHeight + this.rowSpacing) * i);

      // Add a background rectangle to the row
      // TO-DO make conditional statement if updgrade is available here
      var rowBackground = this.add.rectangle(0, 0, 500, this.rowHeight, 0x7e705d);
      rowBackground.setOrigin(0);

      // Set the row background as interactive and add a pointerdown event listener
      rowBackground.setInteractive();

      // Add the label text to the row
      var rowLabel = this.add.text(10, 10, this.menuData[i].label, { color: '#ffffff' });

      var rowSublabel = this.add.text(10, 35, this.getSublabel(this.menuData[i].key), { color: '#c3c2c3' });
      rowSublabel.setFontSize(14);

      let currentMenuKey = this.menuData[i].key;

      let buyButton = new Button(this, 425, this.rowHeight / 2, `$${this.getPrice(this.menuData[i].key)}`, () => {
        // upgrade logic ran here
        this.upgrade(currentMenuKey);
      });

      // Add the row elements to the row container
      rowContainer.add(rowBackground);
      rowContainer.add(rowLabel);
      rowContainer.add(rowSublabel);
      rowContainer.add(buyButton);

      // Add the row container to the menu container
      menuContainer.add(rowContainer);
    }

    if (this.gameStats.purchasedAutoMiner === false) {
      let AMRowBackground = this.add.rectangle(0, 0, 500, this.rowHeight, 0x7e705d);
      AMRowBackground.setOrigin(0);

      var AMRowSublabel = this.add.text(10, 35, 'Unlocks Auto Miner', { color: '#c3c2c3' });
      AMRowSublabel.setFontSize(14);
      var AMRowContainer = this.add.container(0, (this.rowHeight + this.rowSpacing) * 2);
      AMRowContainer.add(AMRowBackground);
      var AMRowLabel = this.add.text(10, 10, "Buy Auto Miner", { color: '#ffffff' });
      AMRowContainer.add(AMRowLabel);
      AMRowContainer.add(AMRowSublabel);

      // Create the button and add it to the container
      let buyAutoMinerButton = new Button(this, 425, this.rowHeight / 2, '$350', () => {
        this.buyAutoMiner();
      });

      AMRowContainer.add(buyAutoMinerButton);
      menuContainer.add(AMRowContainer);
    }

    let sellRowBackground = this.add.rectangle(0, 0, 500, this.rowHeight, 0x4c4438);
    sellRowBackground.setOrigin(0);

    var sellRowContainer = this.add.container(0, (this.rowHeight + this.rowSpacing + 10) * 4);
    sellRowContainer.add(sellRowBackground);
    var sellRowLabel = this.add.text(10, 10, "Sell all resources", { color: '#ffffff' });
    sellRowContainer.add(sellRowLabel);

    // Create the button and add it to the container
    let sellButton = new Button(this, 425, this.rowHeight / 2, 'Sell', () => {
      this.sellItems();
    });

    sellRowContainer.add(sellButton);
    menuContainer.add(sellRowContainer);
    this.add.menuContainer;
  }

  create() {
    this.add.image(0, 50, 'shopBG').setOrigin(0);
    this.toolbar = new Toolbar(this)
    this.toolbar.display()

    this.displayMenu();
  }

  update() { }
}