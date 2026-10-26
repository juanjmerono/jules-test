import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.loopCount = data.loopCount || 1;
    this.adoption = data.adoption || 0;
  }

  create() {
    this.add.rectangle(480, 270, 960, 540, 0x0f111a, 0.95);

    this.add.text(480, 120, '5:00 PM - WORKDAY OVER!', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#bf616a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 180, `AI ADOPTION ACHIEVED: ${Math.round(this.adoption)}% / 100%`, {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const box = this.add.graphics();
    box.fillStyle(0x1b1d28, 1);
    box.fillRect(180, 220, 600, 160);
    box.lineStyle(2, 0xbf616a, 1);
    box.strokeRect(180, 220, 600, 160);

    this.add.text(480, 260, '💸 BUYOUT EXECUTED 💸', {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#bf616a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(480, 310, 'An AI Megacorp has acquired your company\nfor $1.00 USD. You are ruined.', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#d8dee9',
      align: 'center'
    }).setOrigin(0.5);

    const restartText = this.add.text(480, 440, `PRESS [R] TO RESTART TIME LOOP (LOOP #${this.loopCount + 1})`, {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#a3be8c',
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
      this.scene.start('MainScene', { loopCount: this.loopCount + 1 });
    });
  }
}
