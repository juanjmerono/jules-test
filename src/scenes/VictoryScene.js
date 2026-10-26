import Phaser from 'phaser';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  init(data) {
    this.loopCount = data.loopCount || 1;
    this.value = data.value || 25000000;
  }

  create() {
    this.add.rectangle(480, 270, 960, 540, 0x0f111a, 0.95);

    this.add.text(480, 120, '🎉 COMPANY SAVED! 🎉', {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#a3be8c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 180, `YOU BROUGHT AI ADOPTION TO 100%!`, {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const box = this.add.graphics();
    box.fillStyle(0x1b1d28, 1);
    box.fillRect(180, 220, 600, 160);
    box.lineStyle(2, 0xa3be8c, 1);
    box.strokeRect(180, 220, 600, 160);

    const valM = (this.value / 1000000).toFixed(1);
    this.add.text(480, 260, `COMPANY VALUATION: $${valM} MILLION`, {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 310, `You broke the time loop in ${this.loopCount} ${this.loopCount === 1 ? 'loop' : 'loops'}!\nYour software firm is now an AI-powered market leader.`, {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#d8dee9',
      align: 'center'
    }).setOrigin(0.5);

    const restartText = this.add.text(480, 440, 'PRESS [R] TO PLAY AGAIN', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: restartText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.input.keyboard.once('keydown-R', () => {
      this.scene.start('MainScene', { loopCount: 1 });
    });
  }
}
