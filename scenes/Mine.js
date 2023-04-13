class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    init () {
        this.playerStats = this.registry.get('playerStats');
        this.rewards = this.registry.get('rewards');
        this.gameStats = this.registry.get('gameStats');
        this.rocks = this.registry.get('rocks');
        this.backpackText;
        this.rock;
        this.rockHealthText;
        this.rockNameText;
        this.arrow1 = null;
        this.arrow2 = null;
    }

    create(){

        this.aGrid = new AlignGrid({scene:this, rows:11, cols:11})
        //this.aGrid.showNumbers();

        const toolbar = new Toolbar(this);
        this.add.toolbar;

        this.rockHitSound = this.sound.add("rockHit");
        this.rockHitBreakSound = this.sound.add("rockHitBreak");
        this.rewardSound = this.sound.add("reward");
        this.errorSound = this.sound.add("error");
        this.backpackText = this.add.text(55, 75, `${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`);

        // Create Shop Button

        // Create Next Rock Button

        // Create Rock 
        if (this.isObjEmpty(this.gameStats.rewardOnScreen)){
            this.createRock(this.gameStats.currentRock);
        } else {
            this.showReward(this.gameStats.rewardOnScreen);
        }

        // PickAxe

        // Coins
    }

    update(){}

    createRock(rockObj){
        this.rock = this.add.sprite(0, 0, "rock").setInteractive();
        this.rock.scale = 0.5;
        Align.center(this.rock);

        let maxRockHealth = rockObj.maxHealth;
        let currentRockHealth;
        if (this.gameStats.currentRockHealth > 0){
            currentRockHealth = this.gameStats.currentRockHealth;
        } else {
            currentRockHealth = rockObj.maxHealth;
        }

        this.rockHealthText = this.add.text(0, 0, `${currentRockHealth}/${maxRockHealth}`);
        this.rockHealthText.setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(93, this.rockHealthText);

        this.createRockUI(rockObj);

        let possibleRewards = rockObj.possibleRewards;

        this.rock.on("pointerup", () => {
            currentRockHealth -= this.playerStats.pickAxePower;

            this.gameStats.currentRockHealth = currentRockHealth;
            this.registry.set('gamesStats', this.gameStats);

            if (currentRockHealth > 0){
                this.rockHealthText.setText(`${currentRockHealth}/${maxRockHealth}`);
                this.rockHitSound.play();
            } else {
                this.rockHealthText.setText(`0/${maxRockHealth}`);
                this.rockHitBreakSound.play();
                this.removeRockUI();
                this.showReward(this.getReward(possibleRewards));
            }
            
        })
    }

    getReward(rewards){
        return rewards[Math.floor(Math.random() * (rewards.length))];
    }

    showReward(reward){
        let rewardSprite = this.add.sprite(0, 0, reward.name).setInteractive();
        rewardSprite.scale = 0.3;
        Align.center(rewardSprite);

        let clickable = true;

        this.gameStats.rewardOnScreen = reward;

        rewardSprite.on("pointerup", () => {
            // Only register one click from the user
            if (!clickable) {
                return;
            }
            clickable = false;

            // Check if the player has room to collect item
            if(this.playerStats.currentItemCount < this.playerStats.backPackCapacity){
                this.rewardSound.play();
                this.time.addEvent({delay: /*1000*/0, callback: () =>{
                    // Add reward to backpack
                    this.playerStats.currentBackpackItems.push(reward);
                    
                    // Update backpack current items
                    this.playerStats.currentItemCount++;
                    this.backpackText.setText(`${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`)
                    
                    // Update registry
                    this.registry.set('playerStats', this.playerStats);

                    // Remove current reward and create a new rock
                    this.gameStats.rewardOnScreen = {};
                    this.registry.set('gameStats', this.gameStats);
                    rewardSprite.destroy();
                    this.createRock(this.gameStats.currentRock);
                }})   
            } else {
                this.errorSound.play();
                clickable = true;
                // Display need to sell message

            }
        })
    }

    createRockUI(rockData) {

        // Display Rock name
        this.rockNameText = this.add.text(0,0, rockData.name);
        this.rockNameText.setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(104, this.rockNameText);

        // If RockI display purchase next Rock button or arrow to next rock if owned
        if(rockData.number == 0){
            this.displayArrows(105, 2, true, rockData.number);
        }
        // If RockI < Rock# < RockFinal, display purchase next Rock button or arrows back/to next rock if owned
        else if(rockData.number < this.gameStats.purchasedRocks.length - 1){
            this.displayArrows(103, 1, false, rockData.number);
            this.displayArrows(105, 2, true, rockData.number);
        }
        // If RockFinal display arrows back
        else if (rockData.number == this.gameStats.purchasedRocks.length - 1){
            this.displayArrows(103, 1, false, rockData.number);
        }
    }

    displayArrows(position, arrowNum, flipped, currentRockIndex) {
        let arrow;

        if (arrowNum == 1) {
            this.arrow1 = this.add.sprite(0,0, "arrow").setInteractive();
            arrow = this.arrow1;
        } else {
            this.arrow2 = this.add.sprite(0,0, "arrow").setInteractive();
            arrow = this.arrow2;
        }

        arrow.scale = 0.05;
        arrow.flipX = flipped;
        this.aGrid.placeAtIndex(position, arrow);

        arrow.on("pointerup", () =>{

            if(currentRockIndex == this.gameStats.purchasedRocks.length  || currentRockIndex < 0){
                return;
            }

            // Right arrow currentRockIndex++ Left arrow currentRockIndex--
            flipped ? this.gameStats.currentRock = this.gameStats.purchasedRocks[currentRockIndex + 1] : this.gameStats.currentRock = this.gameStats.purchasedRocks[currentRockIndex - 1];
            this.gameStats.currentRockHealth = this.gameStats.currentRock.maxHealth;
            this.registry.set('gameStats', this.gameStats);

            // Destroy old UI sprites and text
            this.removeRockUI(); 

            // Create new rock
            this.createRock(this.gameStats.currentRock);

        })
    }

    removeRockUI(){
        if (this.arrow1 != null){
            this.arrow1.destroy();
            this.arrow1 = null;
        } 
        if (this.arrow2 != null){
            this.arrow2.destroy();
            this.arrow2 = null;
        }

        this.rock.destroy();
        this.rockHealthText.destroy();
        this.rockNameText.destroy();
    }

    isObjEmpty (obj) {
        return Object.keys(obj).length === 0;
    }
}