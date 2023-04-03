class Toolbar extends Phaser.GameObjects.Container {
    constructor(currentScene, sceneName) {
        super(currentScene);
        this.currentScene = currentScene;

        var rect = new Phaser.Geom.Rectangle(0, 0, 800, 60);
        var toolbar = currentScene.add.graphics({ fillStyle: { color: 0xB8C9CA } });
        toolbar.fillRectShape(rect);

        const backPackButton = new SceneSwitchButton(this.currentScene, 30, 30, "backpack", .1, .1, "backpack");
        
        var coinIcon = this.currentScene.add.sprite(150, 30, "coins");
        coinIcon.scaleX = .1;
        coinIcon.scaleY = .1;
        var pickaxeIcon = this.currentScene.add.sprite(690, 30, "pickaxe");
        pickaxeIcon.scaleX = .1;
        pickaxeIcon.scaleY = .1;

        currentScene.add.text(360, 20, sceneName);
        currentScene.add.toolbar;

        if (sceneName == "Mine Scene") { // is mine, needs work
            const shopButton = new SceneSwitchButton(this.currentScene, 760, 30, "shop", .1, .1, "shop");
        } else { 
            const caveButton = new SceneSwitchButton(this.currentScene, 760, 30, "cave", .1, .1, "mine");
        }
    }
}