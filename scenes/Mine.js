class Mine extends Phaser.Scene {
  constructor() {
    super('mine')
  }

  init() {
    this.playerStats = DataManager.load('playerStats')
    this.rewards = DataManager.load('rewards')
    this.gameStats = DataManager.load('gameStats')
    this.rocks = DataManager.load('rocks')
    this.backpackText
    this.rock
    this.rockHealthText
    this.rockNameText
    this.isAutoMining = false
    this.arrow1 = null
    this.arrow2 = null
  }

  create() {
    this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11})
    this.add.image(0, 0, 'caveBG').setOrigin(0)

    //this.aGrid.showNumbers();

    const toolbar = new Toolbar(this)
    this.add.toolbar
    this.rockHitSound = this.sound.add('rockHit')
    this.rockHitBreakSound = this.sound.add('rockHitBreak')
    this.rewardSound = this.sound.add('reward')
    this.errorSound = this.sound.add('error')
    this.backpackText = this.add
      .text(0, 0, `${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`)
      .setOrigin(0, 0.5)
    this.aGrid.placeAtIndex(0.5, this.backpackText)

    // Create Rock
    if (this.isObjEmpty(this.gameStats.rewardOnScreen)) {
      this.createRock(this.gameStats.currentRock)
    } else {
      this.showReward(this.gameStats.rewardOnScreen)
    }
  }

  update() {
    if (!this.isAutoMining) {
      this.isAutoMining = true
      this.autoMine()
    }
  }

  autoMine() {
    this.time.addEvent({
      delay: this.playerStats.autoMinerSpeed,
      callback: () => {
        if (
          this.playerStats.autoMinerDamage > 0 &&
          this.isObjEmpty(this.gameStats.rewardOnScreen)
        ) {
          this.damageRock(this.playerStats.autoMinerDamage)
        }
        this.isAutoMining = false
      },
    })
  }

  createRock(rockObj) {
    this.rock = this.add.sprite(0, 0, 'rock').setInteractive()
    this.rock.scale = 0.5
    Align.center(this.rock)

    let maxRockHealth = rockObj.maxHealth
    let currentRockHealth
    if (this.gameStats.currentRockHealth > 0) {
      currentRockHealth = this.gameStats.currentRockHealth
    } else {
      currentRockHealth = rockObj.maxHealth
      this.gameStats.currentRockHealth = rockObj.maxHealth
    }

    DataManager.update('gameStats', this.gameStats)

    this.rockHealthText = this.add.text(0, 0, `${currentRockHealth}/${maxRockHealth}`)
    this.rockHealthText.setOrigin(0.5, 0.5)
    this.aGrid.placeAtIndex(93, this.rockHealthText)

    this.createRockUI(rockObj)

    this.rock.on('pointerup', () => {
      this.damageRock(this.playerStats.pickAxePower)
    })
  }

  damageRock(damage) {
    this.gameStats.currentRockHealth -= damage
    DataManager.update('gameStats', this.gameStats)

    if (this.gameStats.currentRockHealth > 0) {
      this.rockHealthText.setText(
        `${this.gameStats.currentRockHealth}/${this.gameStats.currentRock.maxHealth}`
      )
      this.rockHitSound.play()
    } else {
      this.rockHealthText.setText(`0/${this.gameStats.currentRock.maxHealth}`)
      this.rockHitBreakSound.play()
      this.removeRockUI()
      this.showReward(this.getReward(this.gameStats.currentRock.possibleRewards))
    }
  }

  getReward(rewards) {
    return rewards[Math.floor(Math.random() * rewards.length)]
  }

  showReward(reward) {
    let rewardSprite = this.add.sprite(0, 0, reward.name).setInteractive()
    rewardSprite.scale = 0.3
    Align.center(rewardSprite)

    let clickable = true

    this.gameStats.rewardOnScreen = reward
    DataManager.update('gameStats', this.gameStats)

    rewardSprite.on('pointerup', () => {
      // Only register one click from the user
      if (!clickable) {
        return
      }
      clickable = false

      // Check if the player has room to collect item
      if (this.playerStats.currentItemCount < this.playerStats.backPackCapacity) {
        this.rewardSound.play()
        this.time.addEvent({
          delay: /*1000*/ 0,
          callback: () => {
            // Add reward to backpack
            this.playerStats.currentBackpackItems.push(reward)

            // Update backpack current items
            this.playerStats.currentItemCount++
            this.backpackText.setText(
              `${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`
            )

            DataManager.update('playerStats', this.playerStats)

            // Remove current reward and create a new rock
            this.gameStats.rewardOnScreen = {}
            DataManager.update('gameStats', this.gameStats)
            rewardSprite.destroy()
            this.createRock(this.gameStats.currentRock)
          },
        })
      } else {
        this.errorSound.play()
        clickable = true
        // Display need to sell message
      }
    })
  }

  createRockUI(rockData) {
    const availableRocks = Object.keys(this.rocks)
    // Display Rock name
    this.rockNameText = this.add.text(0, 0, rockData.name)
    this.rockNameText.setOrigin(0.5, 0.5)
    this.aGrid.placeAtIndex(104, this.rockNameText)

    // If RockI display purchase next Rock button or arrow to next rock if owned
    if (rockData.number == 0) {
      this.displayArrows(105, 2, true, rockData.number)
    }
    // If RockI < Rock# < RockFinal, display purchase next Rock button or arrows back/to next rock if owned
    else if (rockData.number < availableRocks.length - 1) {
      this.displayArrows(103, 1, false, rockData.number)
      this.displayArrows(105, 2, true, rockData.number)
    }
    // If RockFinal display arrows back
    else if (rockData.number == availableRocks.length - 1) {
      this.displayArrows(103, 1, false, rockData.number)
    }
  }

  displayArrows(position, arrowNum, flipped, currentRockIndex) {
    const nextRock = Object.values(this.rocks)[currentRockIndex + 1]
    let arrow
    if (arrowNum == 1) {
      this.arrow1 = this.add.sprite(0, 0, 'arrow').setInteractive()
      arrow = this.arrow1
    } else {
      this.arrow2 = this.add.sprite(0, 0, 'arrow').setInteractive()
      arrow = this.arrow2
    }
    arrow.scale = 0.05
    arrow.flipX = flipped
    this.aGrid.placeAtIndex(position, arrow)
    var rockPurchased = false
    if (currentRockIndex + 1 >= this.gameStats.purchasedRocks.length && flipped) {
      arrow.on('pointerup', () => {
        var rockNumber
        if (currentRockIndex == 0) {
          rockNumber = 'II'
        } else if (currentRockIndex == 1) {
          rockNumber = 'III'
        } else {
          rockNumber = 'IV'
        }
        if (nextRock.price <= this.playerStats.coins) {
          const text = this.add.text(
            70,
            100,
            `Would You Like To Purchase Rock ${rockNumber} for ${nextRock.price} coins?`,
            {
              fontSize: '18px',
              fill: '#fff',
              backgroundColor: '#000',
            }
          )
          text.setPadding(10, 10, 10, 10)
          const buttonYes = this.add.text(625, 100, 'Yes', {
            fontSize: '18px',
            fill: '#fff',
            backgroundColor: '#000',
          })
          buttonYes.setPadding(10, 10, 10, 10)
          buttonYes.setInteractive().on('pointerdown', () => {
            // Yes logic
            text.destroy()
            buttonYes.destroy()
            buttonNo.destroy()
            this.playerStats.coins = this.playerStats.coins - nextRock.price
            console.log(this.playerStats.coins)
            this.gameStats.purchasedRocks.push(nextRock)
            if (currentRockIndex == this.gameStats.purchasedRocks.length || currentRockIndex < 0) {
              return
            }
            this.gameStats.currentRock = this.gameStats.purchasedRocks[currentRockIndex + 1]
            this.gameStats.currentRockHealth = this.gameStats.currentRock.maxHealth
            DataManager.update('gameStats', this.gameStats)
            // Destroy old UI sprites and text
            this.removeRockUI()
            // Create new rock
            this.createRock(this.gameStats.currentRock)
            this.toolbar.display()
          })
          const buttonNo = this.add.text(700, 100, 'No', {
            fontSize: '18px',
            fill: '#fff',
            backgroundColor: '#000',
          })
          buttonNo.setPadding(10, 10, 10, 10)
          buttonNo.setInteractive().on('pointerdown', () => {
            // No logic
            text.destroy()
            buttonYes.destroy()
            buttonNo.destroy()
          })
        } else {
          const text = this.add.text(
            70,
            100,
            `Not enough coins. Rock ${rockNumber} costs ${nextRock.price} coins.`,
            {
              fontSize: '18px',
              fill: '#fff',
              backgroundColor: '#000',
            }
          )
          text.setPadding(10, 10, 10, 10)
          const buttonOk = this.add.text(600, 100, 'Ok', {
            fontSize: '18px',
            fill: '#fff',
            backgroundColor: '#000',
          })
          buttonOk.setPadding(10, 10, 10, 10)
          buttonOk.setInteractive().on('pointerdown', () => {
            text.destroy()
            buttonOk.destroy()
          })
        }
      })
    } else {
      rockPurchased = true
    }
    if (rockPurchased) {
      arrow.on('pointerup', () => {
        if (currentRockIndex == this.gameStats.purchasedRocks.length || currentRockIndex < 0) {
          return
        }
        // Right arrow currentRockIndex++ Left arrow currentRockIndex--
        flipped
          ? (this.gameStats.currentRock = this.gameStats.purchasedRocks[currentRockIndex + 1])
          : (this.gameStats.currentRock = this.gameStats.purchasedRocks[currentRockIndex - 1])
        this.gameStats.currentRockHealth = this.gameStats.currentRock.maxHealth
        DataManager.update('gameStats', this.gameStats)
        // Destroy old UI sprites and text
        this.removeRockUI()
        // Create new rock
        this.createRock(this.gameStats.currentRock)
      })
    }
  }

  removeRockUI() {
    if (this.arrow1 != null) {
      this.arrow1.destroy()
      this.arrow1 = null
    }
    if (this.arrow2 != null) {
      this.arrow2.destroy()
      this.arrow2 = null
    }

    this.rock.destroy()
    this.rockHealthText.destroy()
    this.rockNameText.destroy()
  }

  isObjEmpty(obj) {
    return Object.keys(obj).length === 0
  }
}
