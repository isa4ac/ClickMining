class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    init (data) {
        console.log(data)
        this.backPackCapacity = data.playerStats.backPackCapacity
    }

    create(){
        this.add.text(20, 20, "Mine Scene");

        // Create Backpack Button
        const backPackButton = new SceneSwitchButton(this, 35, 65, "backpack", .1, .1, "backpack");
        const shopButton = new SceneSwitchButton(this, 765, 65, "shop", .1, .1, "shop");
        this.add.shopButton;
        this.add.backPackButton;
        this.add.text(55, 75, `0/${this.backPackCapacity}`);

        // Create Shop Button

        // Create Next Rock Button

        // Create Rock 

        // PickAxe

        // Coins
    }

    update(){}

}