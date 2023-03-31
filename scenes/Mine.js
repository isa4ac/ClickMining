class Mine extends Phaser.Scene {
    constructor() {
        super("mine");
    }

    init () {
        this.playerStats = this.registry.get('playerStats');
        this.rewards = this.registry.get('rewards');
        this.gameStats = this.registry.get('gameStats');
        this.backpackText;
        
    }

    create(){

        this.add.text(20, 20, "Mine Scene");

        this.rockHitSound = this.sound.add("rockHit");
        this.rockHitBreakSound = this.sound.add("rockHitBreak");
        this.rewardSound = this.sound.add("reward");
        this.errorSound = this.sound.add("error");

        // Create Backpack Button
        const backPackButton = new SceneSwitchButton(this, 35, 65, "backpack", .1, .1, "backpack");
        const shopButton = new SceneSwitchButton(this, 765, 65, "shop", .1, .1, "shop");
        this.add.shopButton;
        this.add.backPackButton;
        this.backpackText = this.add.text(55, 75, `${this.playerStats.currentItemCount}/${this.playerStats.backPackCapacity}`);

        // Create Shop Button

        // Create Next Rock Button

        // Create Rock 
        if (this.isObjEmpty(this.gameStats.rewardOnScreen)){
            this.createRock();
        } else {
            this.showReward(this.gameStats.rewardOnScreen);
        }

        // PickAxe

        // Coins
    }

    update(){}

    createRock(){
        let rock = this.add.sprite(400, 300, "rock").setInteractive();
        rock.scale = 0.5;

        let maxRockHealth = 1000;
        let currentRockHealth;

        if (this.gameStats.currentRockHealth > 0){
            currentRockHealth = this.gameStats.currentRockHealth;
        } else {
            currentRockHealth = 1000;
        }

        let rockHealthText = this.add.text(350, 450, `${currentRockHealth}/${maxRockHealth}`);

        let possibleRewards = [this.rewards.diamond, this.rewards.amethyst, this.rewards.emerald, 
            this.rewards.ruby, this.rewards.sapphire, this.rewards.topaz, this.rewards.coal, this.rewards.quartz, this.rewards.iron];

        rock.on("pointerup", () => {
            currentRockHealth -= this.playerStats.pickAxePower;

            this.gameStats.currentRockHealth = currentRockHealth;
            this.registry.set('gamesStats', this.gameStats);

            if (currentRockHealth > 0){
                rockHealthText.setText(`${currentRockHealth}/${maxRockHealth}`);
                this.rockHitSound.play();
            } else {
                rockHealthText.setText(`0/${maxRockHealth}`);
                this.rockHitBreakSound.play();
                rock.destroy();
                rockHealthText.destroy();
                this.showReward(this.getReward(possibleRewards));
            }
            
        })
    }

    getReward(rewards){
        return rewards[Math.floor(Math.random() * (rewards.length))];
    }

    showReward(reward){
        let rewardSprite = this.add.sprite(400, 300, reward.name).setInteractive();
        rewardSprite.scale = 0.3;

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
                    this.createRock();
                }})   
            } else {
                this.errorSound.play();
                clickable = true;
                // Display need to sell message

            }
        })
    }

    isObjEmpty (obj) {
        return Object.keys(obj).length === 0;
    }
}