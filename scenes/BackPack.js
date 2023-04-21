class BackPack extends Phaser.Scene {
  constructor() {
    super('backpack')
  }

  init() {
    this.playerStats = DataManager.load('playerStats')
    this.rewards = DataManager.load('rewards')
    this.gameStats = DataManager.load('gameStats')
  }

  create() {
    this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11})
    this.add.image(0, 0, 'backpackBG').setOrigin(0)

    //this.aGrid.showNumbers();

    const toolbar = new Toolbar(this)
    this.add.toolbar

    let backpackItems = this.playerStats.currentBackpackItems
    let itemNames = []

    for (let i in backpackItems) {
      itemNames.push(backpackItems[i].name)
    }

    // Count every unique item in backpackItems
    let uniqs = itemNames.reduce((acc, val) => {
      acc[val] === undefined ? (acc[val] = 1) : (acc[val] += 1)
      return acc
    }, {})

    this.displayItems(uniqs)
  }

  update() {}

  displayItems(items) {
    let startingCell = 23
    let currentCell = startingCell

    for (let prop in items) {
      let rewardSprite = this.add.sprite(0, 0, prop)
      rewardSprite.scale = 0.1
      let desc = this.add.text(0, 0, `${prop}-${items[prop]}`)
      desc.setOrigin(0, 1.5)
      let value = this.add.text(0, 0, `$${items[prop] * this.rewards[prop].value}`)
      value.setOrigin(0, 0.5)

      if (currentCell == startingCell) {
        this.aGrid.placeAtIndex(startingCell, rewardSprite)
        this.aGrid.placeAtIndex(startingCell + 1 - 0.5, desc)
        this.aGrid.placeAtIndex(startingCell + 1 - 0.5, value)
      } else if (currentCell < startingCell + 9) {
        this.aGrid.placeAtIndex(currentCell, rewardSprite)
        this.aGrid.placeAtIndex(currentCell + 1 - 0.5, desc)
        this.aGrid.placeAtIndex(currentCell + 1 - 0.5, value)
      } else {
        startingCell += 22
        currentCell = startingCell
        this.aGrid.placeAtIndex(startingCell, rewardSprite)
        this.aGrid.placeAtIndex(startingCell + 1 - 0.5, desc)
        this.aGrid.placeAtIndex(startingCell + 1 - 0.5, value)
      }

      currentCell += 3
    }
  }
}
