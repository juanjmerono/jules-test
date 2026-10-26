import Phaser from 'phaser';
import { createGameTextures } from '../utils/TextureGenerator.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    createGameTextures(this);

    const titleText = this.add.text(480, 200, 'CTO: SAVE THE COMPANY', {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const subtitleText = this.add.text(480, 260, 'Implement AI before 5:00 PM or face a $1 buyout!', {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#e5e9f0'
    }).setOrigin(0.5);

    const startText = this.add.text(480, 360, 'PRESS [SPACE] TO START THE LOOP', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#a3be8c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('MainScene', { loopCount: 1 });
    });
  }
}
