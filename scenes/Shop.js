class Shop extends Phaser.Scene {
    constructor() {
        super("shop");
    }

    init() {
        this.playerStats = DataManager.load('playerStats');
        this.gameStats = DataManager.load('gameStats');
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

      getSublabel(key) {
        if (key === "pickaxeUpgrade") {
            return `Pickaxe Power Will Become ${this.playerStats.pickAxePower + 100}`
        } else if (key === "backpackUpgrade") {
            return `Backpack Capacity Will Become ${this.playerStats.backPackCapacity + 5}`
        } else if (key === "autoMinerDamageUpgrade") {
            return `Autominer Will Deal ${this.playerStats.autoMinerDamage + 100} Damage`
        } else if (key === "autoMinerSpeedUpgrade") {
          return `Autominer Will Strike Every ${this.playerStats.autoMinerSpeed > 0 ? (this.playerStats.autoMinerSpeed - 500)/1000 : 0 } Seconds`
        }
      }

    create(){
        this.add.image(0, 50, 'shopBG').setOrigin(0);
        const toolbar = new Toolbar(this);
        this.add.toolbar;

        // Create a new container for the menu
        var menuContainer = this.add.container(150, 200);

        // Define the row height and spacing
        var rowHeight = 60; 
        var rowSpacing = 10;

        // Define the data for the menu rows
        var menuData = [];
        menuData.push({ label: `Pickaxe Upgrade Tier ${this.convertToRoman(((this.playerStats.pickAxePower)/100)+1)}`, key: "pickaxeUpgrade"}) // + 100 Per Tier
        menuData.push({ label: `Backpack Upgrade Tier ${this.convertToRoman(((this.playerStats.backPackCapacity)/5)+1)}`, key: "backpackUpgrade"}) // + 5 Per Tier
        menuData.push({ label: `Auto Miner Damage Tier ${this.convertToRoman(((this.playerStats.autoMinerDamage)/100)+1)}`, key: "autoMinerDamageUpgrade"}) // + 100 Per Tier
        menuData.push({ label: `Auto Miner Speed Tier ${this.convertToRoman(((this.playerStats.autoMinerSpeed)/(-500))+12)}`, key: "autoMinerSpeedUpgrade"}) // - .5  Seconds Per Tier
        
        // Loop through the data and create a new row for each item
        for (var i = 0; i < menuData.length; i++) {
            // Create a new row container for this item
            var rowContainer = this.add.container(0, (rowHeight + rowSpacing) * i);

            // Add a background rectangle to the row
            // TO-DO make conditional statement if updgrade is available here
            var rowBackground = this.add.rectangle(0, 0, 500, rowHeight, 0x333333);
            rowBackground.setOrigin(0);

            // Add the label text to the row
            var rowLabel = this.add.text(10, 10, menuData[i].label, { color: '#ffffff' });

            var rowSublabel = this.add.text(10, 40, this.getSublabel(menuData[i].key), { color: '#c3c2c3' });
            rowSublabel.setFontSize(14);

            // Add the row elements to the row container
            rowContainer.add(rowBackground);
            rowContainer.add(rowLabel);
            rowContainer.add(rowSublabel);

            // Add the row container to the menu container
            menuContainer.add(rowContainer);

            // Set the row container as interactive and add a pointerdown event listener
            rowContainer.setInteractive();
            rowContainer.on('pointerdown', function() {
                console.log('Clicked on row with value ' + menuData[i].value);
            }, this);
        }

        var sellRowBackground = this.add.rectangle(0, 0, 500, rowHeight, 0x7ae08e);
        sellRowBackground.setOrigin(0);
        var sellRowContainer = this.add.container(0, (rowHeight + rowSpacing) * i);
        sellRowContainer.add(sellRowBackground);
        var sellRowLabel = this.add.text(10, 10, "Sell all resources", { color: '#ffffff' });
        sellRowContainer

        menuContainer.add(sellRowContainer);
        this.add.menuContainer;
    }

    update(){}
}