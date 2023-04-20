class Shop extends Phaser.Scene {
  constructor() {
    super("shop");
  }

  init() {
    this.playerStats = DataManager.load('playerStats');
    this.gameStats = DataManager.load('gameStats');
    this.PAPowerInterval = 100;
    this.BackpackInterval = 5;
    this.AMPowerInterval = 50;
    this.AMTimeInterval = 100;
  }

  sellItems() {
    var backpackItems = this.playerStats.currentBackpackItems;
    for (var i = backpackItems.length - 1; i >= 0; i--) {
      this.playerStats.coins = this.playerStats.coins + backpackItems[i].value;
      backpackItems.pop(i);
    }
    this.playerStats.currentBackpackItems = backpackItems;
    // update coin labels function here
    DataManager.update('playerStats', this.playerStats);
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
    // validate

    // incrementUpgrade / take coins
    incrementUpgrade(key);

    // update labels, pickaxe power, coins
  }

  updateLabels() {

  }

  getPrice(key) {
    if (key === "pickaxeUpgrade") {
      let pickAxePower = this.playerStats.pickAxePower;
      return (1.15*pickAxePower)/10
    } else if (key === "backpackUpgrade") {
      let backPackCapacity = this.playerStats.backPackCapacity;
      return (1.15*backPackCapacity)*20
    } else if (key === "autoMinerDamageUpgrade") {
      let backPackCapacity = this.playerStats.backPackCapacity;
    } else if (key === "autoMinerSpeedUpgrade") {

    }
  }

  incrementUpgrade(key) {
    if (key === "pickaxeUpgrade") {
      this.playerStats.pickAxePower = this.playerStats.pickAxePower + this.PAPowerInterval;
    } else if (key === "backpackUpgrade") {
      this.playerStats.backPackCapacity = this.playerStats.backPackCapacity + this.BackpackInterval;
    } else if (key === "autoMinerDamageUpgrade") {
      this.playerStats.autoMinerDamage = this.playerStats.autoMinerDamage + this.AMPowerInterval;
    } else if (key === "autoMinerSpeedUpgrade") {
      this.playerStats.autoMinerSpeed = this.playerStats.autoMinerSpeed - this.AMTimeInterval;
    }
    this.playerStats.coins = this.playerStats.coins - this.getPrice(key);
  }

  getSublabel(key) {
    if (key === "pickaxeUpgrade") {
      return `+100 Pickaxe Power (${this.playerStats.pickAxePower + this.PAPowerInterval})`
    } else if (key === "backpackUpgrade") {
      return `+5 Backpack Space (${this.playerStats.backPackCapacity + this.BackpackInterval})`
    } else if (key === "autoMinerDamageUpgrade") {
      return `+50 Auto Miner Power (${this.playerStats.autoMinerDamage + this.AMPowerInterval})`
    } else if (key === "autoMinerSpeedUpgrade") {
      if (this.playerStats.autoMinerSpeed >= 500) {
        return `+0.1 Second Auto Miner Speed (${(this.playerStats.autoMinerSpeed - this.AMTimeInterval) / 1000}s)`
      } else {
        return 'Max Autominer Speed Reached! (0.5s)'
      }
    }
  }


  create() {
    this.add.image(0, 50, 'shopBG').setOrigin(0);
    const toolbar = new Toolbar(this);
    this.add.toolbar;

    // Create a new container for the menu
    var menuContainer = this.add.container(150, 140);

    // Define the row height and spacing
    var rowHeight = 60;
    var rowSpacing = 10;

    // Define the data for the menu rows
    var menuData = [];
    menuData.push({ label: `Pickaxe Upgrade Tier ${this.convertToRoman(((this.playerStats.pickAxePower) / this.PAPowerInterval) + 1)}`, key: "pickaxeUpgrade" }) // + 100 Per Tier
    menuData.push({ label: `Backpack Upgrade Tier ${this.convertToRoman(((this.playerStats.backPackCapacity) / this.BackpackInterval) + 1)}`, key: "backpackUpgrade" }) // + 5 Per Tier
    menuData.push({ label: `Auto Miner Damage Tier ${this.convertToRoman(((this.playerStats.autoMinerDamage) / this.AMPowerInterval) + 1)}`, key: "autoMinerDamageUpgrade" }) // + 50 Per Tier
    menuData.push({ label: `Auto Miner Speed Tier ${this.convertToRoman(((this.playerStats.autoMinerSpeed-this.AMTimeInterval) / 1000) + 1)}`, key: "autoMinerSpeedUpgrade" }) // - .1  Seconds Per Tier

    // Loop through the data and create a new row for each item
    for (var i = 0; i < menuData.length; i++) {
      // Create a new row container for this item
      var rowContainer = this.add.container(0, (rowHeight + rowSpacing) * i);

      // Add a background rectangle to the row
      // TO-DO make conditional statement if updgrade is available here
      var rowBackground = this.add.rectangle(0, 0, 500, rowHeight, 0x7e705d);
      rowBackground.setOrigin(0);

      // Set the row background as interactive and add a pointerdown event listener
      rowBackground.setInteractive();
      rowBackground.on('pointerdown', () => {
        console.log('Clicked on row with value ' + menuData[i].value);
      }, this);

      // Add the label text to the row
      var rowLabel = this.add.text(10, 10, menuData[i].label, { color: '#ffffff' });

      var rowSublabel = this.add.text(10, 35, this.getSublabel(menuData[i].key), { color: '#c3c2c3' });
      rowSublabel.setFontSize(14);

      let buyButton = new Button(this, 425, rowHeight / 2, 'Buy', () => {
        // upgrade logic ran here
      });

      // Add the row elements to the row container
      rowContainer.add(rowBackground);
      rowContainer.add(rowLabel);
      rowContainer.add(rowSublabel);
      rowContainer.add(buyButton);

      // Add the row container to the menu container
      menuContainer.add(rowContainer);
    }

    let sellRowBackground = this.add.rectangle(0, 0, 500, rowHeight, 0x4c4438);
    sellRowBackground.setOrigin(0);

    var sellRowContainer = this.add.container(0, (rowHeight + rowSpacing + 10) * i);
    sellRowContainer.add(sellRowBackground);
    var sellRowLabel = this.add.text(10, 10, "Sell all resources", { color: '#ffffff' });
    sellRowContainer.add(sellRowLabel);

    // Create the button and add it to the container
    let sellButton = new Button(this, 425, rowHeight / 2, 'Sell', () => {
      this.sellItems();
    });
    sellRowContainer.add(sellButton);

    // this.sellSound = this.sound.add('rockHit')

    menuContainer.add(sellRowContainer);
    this.add.menuContainer;
  }

  update() { }
}