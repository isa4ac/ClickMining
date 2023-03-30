class BackPack extends Phaser.Scene {
    constructor(){
        super("backpack");
    }

    create(){
        this.add.text(20,20, "Backpack Scene");
        const backPackButton = new SceneSwitchButton(this, 35, 65, "cave", .1, .1, "mine");
    }

    update(){}
}