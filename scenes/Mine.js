class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    init (data) {
        console.log(data)
        this.playerStats = data.playerStats;
        this.rewards = data.rewards;
        this.backpackText;
    }

    create(){
        const toolbar = new Toolbar(this, "Mine Scene");
        this.add.toolbar;

        this.rockHitSound = this.sound.add("rockHit");
        this.rockHitBreakSound = this.sound.add("rockHitBreak");
        this.rewardSound = this.sound.add("reward");
        this.errorSound = this.sound.add("error");
        this.backpackText = this.add.text(55, 75, `${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`);

        // Create Shop Button

        // Create Next Rock Button

        // Create Rock 
        this.createRock()

        // PickAxe

        // Coins
    }

    update(){}

    createRock(){
        let rock = this.add.sprite(400, 300, "rock").setInteractive();
        rock.scale = 0.5;

        let maxRockHealth = 1000;
        let currentRockHealth = 1000;
        let rockHealthText = this.add.text(350, 450, `${currentRockHealth}/${maxRockHealth}`);

        let possibleRewards = [this.rewards.diamond, this.rewards.amethyst, this.rewards.emerald, 
            this.rewards.ruby, this.rewards.sapphire, this.rewards.topaz];

        rock.on("pointerup", () => {
            currentRockHealth -= this.playerStats.pickAxePower;

            if (currentRockHealth > 0){
                rockHealthText.setText(`${currentRockHealth}/${maxRockHealth}`);
                this.rockHitSound.play();
            } else {
                rockHealthText.setText(`0/${maxRockHealth}`);
                this.rockHitBreakSound.play();
                rock.destroy();
                rockHealthText.destroy();
                this.showReward(possibleRewards);
            }
            
        })
    }

    showReward(rewards){
        let reward = rewards[Math.floor(Math.random() * (rewards.length -1))];
        console.log(reward);

        let rewardSprite = this.add.sprite(400, 300, reward.name).setInteractive();
        rewardSprite.scale = 0.5;

        let clickable = true;

        rewardSprite.on("pointerup", () => {
            // Only register one click from the user
            if (!clickable) {
                return;
            }
            clickable = false;

            // Check if the player has room to collect item
            if(this.playerStats.currentItemCount < this.playerStats.backPackCapacity){
                this.rewardSound.play();
                this.time.addEvent({delay: 1000, callback: () =>{
                    // Add reward to backpack
                    this.playerStats.currentBackpackitems.push(reward);
                    // Update backpack current items
                    this.playerStats.currentItemCount++;
                    this.backpackText.setText(`${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`)
                    // Remove current reward and create a new rock
                    rewardSprite.destroy();
                    this.createRock();
                }})   
            } else {
                this.errorSound.play();
                clickable = true;
                // Display need to sell message
            }
        })
    }

}