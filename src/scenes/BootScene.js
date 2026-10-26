import Phaser from 'phaser';
import { createGameTextures } from '../utils/TextureGenerator.js';
import { soundManager } from '../utils/SoundManager.js';
import { t, LANGUAGES, getLanguage, setLanguage, onLanguageChange } from '../utils/Localization.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    createGameTextures(this);

    this.titleText = this.add.text(480, 160, t('title'), {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.subtitleText = this.add.text(480, 220, t('subtitle'), {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#e5e9f0',
      align: 'center',
      wordWrap: { width: 800 }
    }).setOrigin(0.5);

    this.startText = this.add.text(480, 320, t('start_prompt'), {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#a3be8c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.startText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Language Selector Container
    this.createLanguageSelector();

    // Listen for language changes to update BootScene text dynamically
    this.unsubscribeLang = onLanguageChange(() => {
      this.updateTexts();
    });

    this.input.keyboard.once('keydown-SPACE', () => {
      soundManager.playSelect();
      this.scene.start('MainScene', { loopCount: 1 });
    });
  }

  createLanguageSelector() {
    this.langLabelText = this.add.text(480, 410, t('lang_select'), {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.langButtons = [];
    const total = LANGUAGES.length;
    const startX = 480 - ((total - 1) * 70) / 2;

    LANGUAGES.forEach((lang, index) => {
      const btnX = startX + index * 70;
      const btnY = 450;
      const isSelected = getLanguage() === lang.code;

      const btnBg = this.add.text(btnX, btnY, `[${lang.code.toUpperCase()}]`, {
        fontFamily: 'Courier New',
        fontSize: '16px',
        color: isSelected ? '#00ffcc' : '#88c0d0',
        backgroundColor: isSelected ? '#2e3440' : '#1b1d28',
        padding: { x: 6, y: 4 }
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btnBg.on('pointerdown', () => {
        soundManager.playSelect();
        setLanguage(lang.code);
      });

      btnBg.on('pointerover', () => {
        if (getLanguage() !== lang.code) {
          btnBg.setColor('#ffffff');
        }
      });

      btnBg.on('pointerout', () => {
        if (getLanguage() !== lang.code) {
          btnBg.setColor('#88c0d0');
        }
      });

      this.langButtons.push({ code: lang.code, button: btnBg });
    });
  }

  updateTexts() {
    this.titleText.setText(t('title'));
    this.subtitleText.setText(t('subtitle'));
    this.startText.setText(t('start_prompt'));
    this.langLabelText.setText(t('lang_select'));

    this.langButtons.forEach(item => {
      const isSelected = getLanguage() === item.code;
      item.button.setColor(isSelected ? '#00ffcc' : '#88c0d0');
      item.button.setBackgroundColor(isSelected ? '#2e3440' : '#1b1d28');
    });
  }

  shutdown() {
    if (this.unsubscribeLang) {
      this.unsubscribeLang();
    }
  }
}
