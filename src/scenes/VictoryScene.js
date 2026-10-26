import Phaser from 'phaser';
import { soundManager } from '../utils/SoundManager.js';
import { t, LANGUAGES, getLanguage, setLanguage, onLanguageChange } from '../utils/Localization.js';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  init(data) {
    this.loopCount = data.loopCount || 1;
    this.value = data.value || 25000000;
  }

  create() {
    soundManager.playVictory();
    this.add.rectangle(480, 270, 960, 540, 0x0f111a, 0.95);

    this.titleText = this.add.text(480, 110, t('victory_title'), {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#a3be8c',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.subtitleText = this.add.text(480, 170, t('victory_subtitle'), {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const box = this.add.graphics();
    box.fillStyle(0x1b1d28, 1);
    box.fillRect(180, 210, 600, 150);
    box.lineStyle(2, 0xa3be8c, 1);
    box.strokeRect(180, 210, 600, 150);

    const valM = (this.value / 1000000).toFixed(1);
    this.valText = this.add.text(480, 245, t('victory_val', { val: valM }), {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const loopsWord = this.loopCount === 1 ? t('victory_loop_single') : t('victory_loop_plural');
    this.descText = this.add.text(480, 295, t('victory_desc', { loop: this.loopCount, loops_word: loopsWord }), {
      fontFamily: 'Courier New',
      fontSize: '15px',
      color: '#d8dee9',
      align: 'center'
    }).setOrigin(0.5);

    this.restartText = this.add.text(480, 400, t('victory_restart'), {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#88c0d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.restartText,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Language selector buttons
    this.createLanguageSelector();

    this.unsubscribeLang = onLanguageChange(() => {
      this.updateTexts();
    });

    this.input.keyboard.once('keydown-R', () => {
      soundManager.playSelect();
      this.scene.start('MainScene', { loopCount: 1 });
    });
  }

  createLanguageSelector() {
    this.langButtons = [];
    const total = LANGUAGES.length;
    const startX = 480 - ((total - 1) * 70) / 2;

    LANGUAGES.forEach((lang, index) => {
      const btnX = startX + index * 70;
      const btnY = 465;
      const isSelected = getLanguage() === lang.code;

      const btnBg = this.add.text(btnX, btnY, `[${lang.code.toUpperCase()}]`, {
        fontFamily: 'Courier New',
        fontSize: '15px',
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
    this.titleText.setText(t('victory_title'));
    this.subtitleText.setText(t('victory_subtitle'));

    const valM = (this.value / 1000000).toFixed(1);
    this.valText.setText(t('victory_val', { val: valM }));

    const loopsWord = this.loopCount === 1 ? t('victory_loop_single') : t('victory_loop_plural');
    this.descText.setText(t('victory_desc', { loop: this.loopCount, loops_word: loopsWord }));
    this.restartText.setText(t('victory_restart'));

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
