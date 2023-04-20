class SceneSwitchButton extends Phaser.GameObjects.Container {
    constructor(currentScene, x, y, buttonImageKey, scaleX, scaleY, targetScene) {
        super(currentScene);

        this.currentScene = currentScene;
        var sound;

        switch(targetScene) {
            case 'mine': sound = this.currentScene.sound.add('mineOpen'); break;
            case 'shop': sound = this.currentScene.sound.add('shopOpen'); break;
            case 'backpack': sound = this.currentScene.sound.add('backpackOpen'); break;
        }

        
        
        const button = this.currentScene.add.sprite(x, y, buttonImageKey).setInteractive();

        button.scaleX = scaleX;
        button.scaleY = scaleY;

        button.on('pointerup', () => {
            var gameStats = DataManager.load("gameStats");
            gameStats.currentScene = targetScene;
            DataManager.update("gameStats", gameStats);
            sound.play();
            this.currentScene.scene.start(targetScene);
            this.currentScene.stop;
        })
    }
}