class SceneSwitchButton extends Phaser.GameObjects.Container {
    constructor(currentScene, x, y, buttonImageKey, targetScene) {
        super(currentScene);

        this.currentScene = currentScene;
        this.x = x;
        this.y = y;

        const button = this.currentScene.add.image(x, y, buttonImageKey).setInteractive();

        button.on('pointerup', () => {
            this.currentScene.scene.start(targetScene);
            this.currentScene.stop;
        })
    }
}