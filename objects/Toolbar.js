class Toolbar extends Phaser.GameObjects.Container {
    constructor(currentScene) {
        super(currentScene);

        var gameStats = DataManager.load("gameStats");
        var playerStats = DataManager.load("playerStats");

        this.currentScene = currentScene;
        this.aGrid = new AlignGrid({ scene: currentScene, rows: 11, cols: 11 })
        //this.aGrid.showNumbers();

        var rect = new Phaser.Geom.Rectangle(0, 0, 800, 60);
        var toolbar = currentScene.add.graphics({ fillStyle: { color: 0xB8C9CA } });
        toolbar.fillRectShape(rect);

        var coinIcon = this.currentScene.add.sprite(150, 30, "coins");
        coinIcon.scaleX = .1;
        coinIcon.scaleY = .1;
        this.aGrid.placeAtIndex(2, coinIcon);
        var coinText = this.currentScene.add.text(165, 30, playerStats.coins).setOrigin(0, 0.5);
        this.aGrid.placeAtIndex(2.5, coinText);

        var pickaxeIcon = this.currentScene.add.sprite(690, 30, "pickaxe").setOrigin(0.5, 0.5);
        pickaxeIcon.scaleX = .1;
        pickaxeIcon.scaleY = .1;
        this.aGrid.placeAtIndex(9, pickaxeIcon)
        var pickaxeText = this.currentScene.add.text(0,0, playerStats.pickAxePower).setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(8, pickaxeText);

        var title = currentScene.add.text(360, 20, gameStats.currentScene).setOrigin(0.5,0.5);
        this.aGrid.placeAtIndex(5, title)
        currentScene.add.toolbar

        if (currentScene.data.systems.config == "mine") { // is mine, needs work
            const shopButton = new SceneSwitchButton(this.currentScene, 760, 30, "shop", .1, .1, "shop");
        } else { 
            const caveButton = new SceneSwitchButton(this.currentScene, 760, 30, "cave", .1, .1, "mine");
        }
        if (gameStats.currentScene != "backpack") {
            const backPackButton = new SceneSwitchButton(this.currentScene, 30, 30, "backpack", .1, .1, "backpack");
        }

    }
}