class AutoMinerEnablerButton extends Phaser.GameObjects.Container {
    constructor(currentScene, x, y, buttonImageKey, scaleX, scaleY, targetScene) {
        super(currentScene);

        this.currentScene = currentScene;
        
        const button = this.currentScene.add.sprite(x, y, buttonImageKey).setInteractive();
        var text = this.currentScene.add.text(x , y, this.displayText(DataManager.load("playerStats").autoMinerEnabled)).setOrigin(0.5);

        button.scaleX = scaleX;
        button.scaleY = scaleY;

        button.on('pointerup', () => {
            var playerStats = DataManager.load("playerStats");
            text.setText(this.displayText(!playerStats.autoMinerEnabled));
            playerStats.autoMinerEnabled = !playerStats.autoMinerEnabled;
            DataManager.update("playerStats", playerStats);
        })
    }

    displayText(text){
        return text ? "ON" : "OFF";
    }
}