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
        const backPackButton = new SceneSwitchButton(this, 30, 80, "backpack", 0.1, 0.1, "backpack");
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