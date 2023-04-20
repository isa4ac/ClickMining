class Toolbar extends Phaser.GameObjects.Container {
    constructor(currentScene) {
        super(currentScene);
        this.currentScene = currentScene;
    }

    init() {
        this.coinText;
        this.pickaxeText;
        this.backPackText;
    }

    display() {
        var gameStats = DataManager.load("gameStats");
        var playerStats = DataManager.load("playerStats");

        this.aGrid = new AlignGrid({ scene: this.currentScene, rows: 11, cols: 11 })

        //this.aGrid.showNumbers();

        var rect = new Phaser.Geom.Rectangle(0, 0, 800, 60);
        var toolbar = this.currentScene.add.graphics({ fillStyle: { color: 0xB8C9CA } });
        toolbar.fillRectShape(rect);

        var coinIcon = this.currentScene.add.sprite(150, 30, "coins");
        coinIcon.scaleX = .1;
        coinIcon.scaleY = .1;
        this.aGrid.placeAtIndex(2, coinIcon);

        this.coinText = this.currentScene.add.text(165, 30, playerStats.coins).setOrigin(0, 0.5);
        this.aGrid.placeAtIndex(2.5, this.coinText);

        var pickaxeIcon = this.currentScene.add.sprite(690, 30, "pickaxe").setOrigin(0.5, 0.5);
        pickaxeIcon.scaleX = .1;
        pickaxeIcon.scaleY = .1;
        this.aGrid.placeAtIndex(9, pickaxeIcon)

        this.pickaxeText = this.currentScene.add.text(0,0, playerStats.pickAxePower).setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(8, this.pickaxeText);

        if(gameStats.purchasedAutoMiner){
            var autoMinerEnabler = new AutoMinerEnablerButton(this.currentScene, 545, 30, "autoMiner", .1, .1, "autoMiner");
        }

        var title = this.currentScene.add.text(360, 20, gameStats.currentScene).setOrigin(0.5,0.5);
        this.aGrid.placeAtIndex(5, title)
        this.currentScene.add.toolbar

        this.backpackText = this.currentScene.add.text(0, 0, `${playerStats.currentBackpackItems.length}/${playerStats.backPackCapacity}`).setOrigin(0, 0.5);
        this.aGrid.placeAtIndex(0.5, this.backpackText);

        if (this.currentScene.data.systems.config == "mine") { // is mine, needs work
            const shopButton = new SceneSwitchButton(this.currentScene, 760, 30, "shop", .1, .1, "shop");
        } else { 
            const caveButton = new SceneSwitchButton(this.currentScene, 760, 30, "cave", .1, .1, "mine");
        }
        if (gameStats.currentScene != "backpack") {
            const backPackButton = new SceneSwitchButton(this.currentScene, 30, 30, "backpack", .1, .1, "backpack");
        }

    }
}