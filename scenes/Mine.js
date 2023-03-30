class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    create(){
        this.add.text(20, 20, "Mine Scene");

        //let sprite = this.add.sprite(100, 100, "backpack");
        
        const backPackButton = new SceneSwitchButton(this, 35, 65, "backpack", .1, .1, "backpack");
        const shopButton = new SceneSwitchButton(this, 765, 65, "shop", .1, .1, "shop");
        this.add.backPackButton;
        this.add.shopButton;
    }

    update(){}

}