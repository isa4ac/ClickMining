class Shop extends Phaser.Scene {
    constructor(){
        super("shop");
    }

    create(){
        const toolbar = new Toolbar(this, "Shop Scene");
        this.add.toolbar;

        // Create a new container for the menu
        var menuContainer = this.add.container(150, 200);

        // Define the row height and spacing
        var rowHeight = 50;
        var rowSpacing = 10;

        // Define the data for the menu rows
        var menuData = [
            { label: 'Option 1', value: 1 }, // Value can be a and object that contains
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
            { label: 'Option 4', value: 4 },
        ];

        // Loop through the data and create a new row for each item
        for (var i = 0; i < menuData.length; i++) {
            // Create a new row container for this item
            var rowContainer = this.add.container(0, (rowHeight + rowSpacing) * i);

            // Add a background rectangle to the row
            var rowBackground = this.add.rectangle(0, 0, 500, rowHeight, 0x333333);
            rowBackground.setOrigin(0);

            // Add the label text to the row
            var rowLabel = this.add.text(10, 10, menuData[i].label, { color: '#ffffff' });

            // Add the row elements to the row container
            rowContainer.add(rowBackground);
            rowContainer.add(rowLabel);

            // Add the row container to the menu container
            menuContainer.add(rowContainer);

            // Set the row container as interactive and add a pointerdown event listener
            rowContainer.setInteractive();
            rowContainer.on('pointerdown', function() {
                console.log('Clicked on row with value ' + menuData[i].value);
            }, this);
        }

        this.add.menuContainer;

        // this.add.text(20,20, "Shop Scene");
        // const backPackButton = new SceneSwitchButton(this, 35, 65, "cave", .1, .1, "mine");
    }

    update(){}
}