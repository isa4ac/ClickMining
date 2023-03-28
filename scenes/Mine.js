class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    create(){
        this.add.text(20, 20, "Mine Scene");

        //let sprite = this.add.sprite(100, 100, "backpack");
        

        const backPackButton = new SceneSwitchButton(this, 0, 0, "backpack", "backpack");

        const shopButton = new SceneSwitchButton(this, 0, 0, "shop", "shop");
        
        this.add.backPackButton;
        this.add.shopButton;
    }

    update(){}

}