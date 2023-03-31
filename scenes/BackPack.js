class BackPack extends Phaser.Scene {
    constructor(){
        super("backpack");
    }

    init () {
        this.playerStats = this.registry.get('playerStats');
        this.rewards = this.registry.get('rewards');
        this.gameStats = this.registry.get('gameStats');

    }

    create(){
        this.aGrid = new AlignGrid({scene:this, rows:11, cols:11})
        //this.aGrid.showNumbers();

        this.add.text(20,20, "Backpack Scene");
        const backPackButton = new SceneSwitchButton(this, 35, 65, "cave", .1, .1, "mine");

        let backpackItems = this.playerStats.currentBackpackItems;
        let itemNames = [];

        for (let i in backpackItems){
            itemNames.push(backpackItems[i].name);
        }

        // Count every unique item in backpackItems
        let uniqs = itemNames.reduce((acc, val) => {
            acc[val] === undefined ? acc[val] = 1 : acc[val] += 1;
            return acc;
          }, {});
        
        this.displayItems(uniqs)

        

    }

    update(){}

    displayItems(items){

        let startingCell = 23;
        let currentCell = startingCell;
        let currentRow = 1;

        for ( let prop in items) {
            let rewardSprite = this.add.sprite(0, 0, prop);
            rewardSprite.scale = 0.1;
            let desc = this.add.text(0,0, `${prop}-${items[prop]}`);

            if (currentCell == startingCell){
                this.aGrid.placeAtIndex(startingCell, rewardSprite);
                this.aGrid.placeAtIndex(startingCell + 1 - 0.5, desc);

            } else if (currentCell < startingCell + 88) {
                this.aGrid.placeAtIndex(currentCell, rewardSprite);
                this.aGrid.placeAtIndex(currentCell + 1 - 0.5, desc);
            } else {
                startingCell += 3;
                currentCell = startingCell;
                this.aGrid.placeAtIndex(startingCell, rewardSprite);
                this.aGrid.placeAtIndex(startingCell + 1 - 0.5, desc);
            }
            
            currentCell += 11;
        }
    }
}