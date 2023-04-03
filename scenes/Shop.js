class Shop extends Phaser.Scene {
    constructor(){
        super("shop");
    }

    create(){
        const toolbar = new Toolbar(this, "Shop Scene");
        this.add.toolbar;

        // this.add.text(20,20, "Shop Scene");
        // const backPackButton = new SceneSwitchButton(this, 35, 65, "cave", .1, .1, "mine");
    }

    update(){}
}