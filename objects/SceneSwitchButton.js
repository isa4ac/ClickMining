class SceneSwitchButton extends Phaser.GameObjects.Container {
    constructor(currentScene, x, y, buttonImageKey, scaleX, scaleY, targetScene) {
        super(currentScene);

        this.currentScene = currentScene;
        
        const button = this.currentScene.add.sprite(x, y, buttonImageKey).setInteractive();

        button.scaleX = scaleX;
        button.scaleY = scaleY;

        button.on('pointerup', () => {
            var gameStats = currentScene.registry.get("gameStats");
            gameStats.currentScene = targetScene;
            currentScene.registry.set("gameStats", gameStats);
            this.currentScene.scene.start(targetScene);
            this.currentScene.stop;
        })
    }
}