class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, onClick) {
    super(scene, x, y);

    this.button = scene.add.graphics();
    this.button.fillStyle(0x4ab570, 1);
    this.button.fillRect(-50, -15, 100, 30);
    this.buttonPressed = scene.add.graphics();
    this.buttonPressed.fillStyle(0x32784b, 1);
    this.buttonPressed.fillRect(-50, -15, 100, 30).setVisible(false);

    this.text = scene.add.text(0, 0, text, { color: '#ffffff' }).setOrigin(0.5);

    this.add([this.button, this.buttonPressed, this.text]);

    this.setInteractive(new Phaser.Geom.Rectangle(-50, -15, 100, 30), Phaser.Geom.Rectangle.Contains);

    this.on('pointerdown', () => {
      this.button.setVisible(false);
      this.buttonPressed.setVisible(true);
    });

    this.on('pointerup', () => {
      this.button.setVisible(true);
      this.buttonPressed.setVisible(false);
      onClick();
    });

    scene.add.existing(this);
  }
}