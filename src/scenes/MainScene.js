import Phaser from 'phaser';
import { soundManager } from '../utils/SoundManager.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  init(data) {
    this.loopCount = data.loopCount || 1;
  }

  create() {
    this.WORLD_WIDTH = 3200;
    this.WORLD_HEIGHT = 540;
    this.FLOOR_Y = 460;
    this.interactables = [];
    this.activeInteractable = null;
    this.activeQuiz = null;
    this.lastStepTime = 0;

    // Core Game Metrics
    this.aiAdoption = 0; // Target: 100%
    this.productivity = 30; // Starting productivity %
    this.companyValue = 10000000; // $10,000,000
    this.timeMinutes = 9 * 60; // 9:00 AM in minutes
    this.END_TIME_MINUTES = 17 * 60; // 5:00 PM in minutes
    this.gameEnded = false;

    // Doors & Access Keys
    this.doors = [
      { id: 'door1', x: 800, locked: true, name: 'DEV BAY DOOR', key: 'key_dev_bay' },
      { id: 'door2', x: 1600, locked: true, name: 'SERVER ROOM DOOR', key: 'key_server_room' },
      { id: 'door3', x: 2400, locked: true, name: 'BOARDROOM DOOR', key: 'key_boardroom' }
    ];

    this.inventory = {
      key_dev_bay: false,
      key_server_room: false,
      key_boardroom: false
    };

    // Task Completion Flags per loop
    this.completedTasks = {
      whiteboard: false,
      cto_laptop: false,
      dev_team: false,
      coffee: false,
      server_engineer: false,
      boardroom_ceo: false
    };

    // Set physics bounds
    this.physics.world.setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);

    // Build room background graphics
    this.createOfficeLayout();

    // Setup Security Door Barriers
    this.createDoorBarriers();

    // Create CTO Player
    this.createPlayer();

    // Setup Camera Follow
    this.setupCamera();

    // Setup Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      interact: Phaser.Input.Keyboard.KeyCodes.E,
      num1: Phaser.Input.Keyboard.KeyCodes.ONE,
      num2: Phaser.Input.Keyboard.KeyCodes.TWO,
      num3: Phaser.Input.Keyboard.KeyCodes.THREE
    });

    // Create Prompt Floating Text Overlay
    this.createPromptUI();

    // Setup HUD overlay
    this.createHUD();

    // Setup Interactive Objects
    this.setupInteractables();

    // Create Quiz Modal Container
    this.createQuizModal();

    // Workday Clock Timer Event (Every 1 second = 5 in-game minutes)
    this.timeTimer = this.time.addEvent({
      delay: 1000,
      callback: this.tickClock,
      callbackScope: this,
      loop: true
    });

    // Define Quiz Questions
    this.setupQuizQuestions();
  }

  createOfficeLayout() {
    const bgGraphics = this.add.graphics();

    // 1. CTO Office (x: 0 - 800)
    bgGraphics.fillStyle(0x1f293d, 1); // Dark Navy Wall
    bgGraphics.fillRect(0, 0, 800, 540);
    bgGraphics.fillStyle(0x2c1f14, 1);
    bgGraphics.fillRect(0, 280, 800, 180);
    bgGraphics.fillStyle(0x3d2b1d, 1);
    bgGraphics.fillRect(0, 276, 800, 6);
    bgGraphics.fillStyle(0x4a3222, 1);
    bgGraphics.fillRect(0, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x3a2619, 1);
    for (let x = 0; x < 800; x += 60) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }

    // 2. Dev Bay (x: 800 - 1600)
    bgGraphics.fillStyle(0x1e222a, 1);
    bgGraphics.fillRect(800, 0, 800, 540);
    bgGraphics.fillStyle(0x00d2d3, 0.7);
    bgGraphics.fillRect(800, 50, 800, 4);
    bgGraphics.fillStyle(0x2d3748, 1);
    bgGraphics.fillRect(800, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x1a202c, 1);
    for (let x = 800; x < 1600; x += 40) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }
    bgGraphics.fillRect(800, this.FLOOR_Y + 40, 800, 2);

    // 3. Server Room (x: 1600 - 2400)
    bgGraphics.fillStyle(0x111625, 1);
    bgGraphics.fillRect(1600, 0, 800, 540);
    bgGraphics.fillStyle(0x34495e, 1);
    bgGraphics.fillRect(1600, 30, 800, 10);
    bgGraphics.fillStyle(0x00f2fe, 1);
    bgGraphics.fillRect(1600, 33, 800, 4);
    bgGraphics.fillStyle(0x1a202c, 1);
    bgGraphics.fillRect(1600, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x2d3748, 1);
    for (let x = 1600; x < 2400; x += 50) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }
    bgGraphics.fillRect(1600, this.FLOOR_Y + 40, 800, 2);

    // 4. Boardroom (x: 2400 - 3200)
    bgGraphics.fillStyle(0x2e1f3d, 1);
    bgGraphics.fillRect(2400, 0, 800, 540);
    bgGraphics.fillStyle(0xd4af37, 0.8);
    bgGraphics.fillRect(2400, 40, 800, 4);
    bgGraphics.fillStyle(0x3a2318, 1);
    bgGraphics.fillRect(2400, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x29180e, 1);
    for (let x = 2400; x < 3200; x += 80) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }

    // Header Wall Borders
    bgGraphics.fillStyle(0x0f111a, 0.9);
    bgGraphics.fillRect(0, 0, this.WORLD_WIDTH, 40);
    bgGraphics.fillStyle(0x3b4252, 1);
    bgGraphics.fillRect(0, 38, this.WORLD_WIDTH, 2);

    // Skirting Baseboard
    bgGraphics.fillStyle(0x1a1c23, 1);
    bgGraphics.fillRect(0, this.FLOOR_Y - 4, this.WORLD_WIDTH, 4);

    // Floor physics setup
    const floor = this.physics.add.staticGroup();
    const floorRect = this.add.rectangle(this.WORLD_WIDTH / 2, this.FLOOR_Y + 40, this.WORLD_WIDTH, 80, 0x000000, 0);
    floor.add(floorRect);
    this.floorLayer = floor;

    // Room Partition Labels
    const roomNames = [
      { name: '1. CTO OFFICE', x: 400 },
      { name: '2. DEV BAY', x: 1200 },
      { name: '3. SERVER ROOM', x: 2000 },
      { name: '4. BOARDROOM', x: 2800 }
    ];

    roomNames.forEach(room => {
      this.add.text(room.x, 65, room.name, {
        fontFamily: 'Courier New',
        fontSize: '16px',
        color: '#88c0d0',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    });

    // Place Background Windows & Decorative Wall Items
    this.add.image(300, 150, 'city_window');
    this.add.image(2600, 150, 'city_window');
    this.add.image(600, 110, 'wall_clock');
    this.add.image(950, 140, 'wall_poster');

    // Place Doorway Background Images
    const doorXPositions = [800, 1600, 2400];
    doorXPositions.forEach(x => {
      this.add.image(x, this.FLOOR_Y - 70, 'doorway');
    });

    // Place Decorative Plants
    this.add.image(60, this.FLOOR_Y - 24, 'office_plant');
    this.add.image(1500, this.FLOOR_Y - 24, 'office_plant');
    this.add.image(3140, this.FLOOR_Y - 24, 'office_plant');

    // Place Interactive Furniture & NPCs
    this.add.image(180, this.FLOOR_Y - 32, 'whiteboard');
    this.add.image(450, this.FLOOR_Y - 26, 'cto_desk');

    this.add.image(1000, this.FLOOR_Y - 26, 'dev_station');
    this.add.image(1300, this.FLOOR_Y - 26, 'dev_station');
    this.add.image(1550, this.FLOOR_Y - 23, 'coffee_machine');
    this.add.image(1150, this.FLOOR_Y - 24, 'npc_dev');

    this.add.image(1750, this.FLOOR_Y - 61, 'server_rack');
    this.add.image(1900, this.FLOOR_Y - 61, 'server_rack');
    this.add.image(2150, this.FLOOR_Y - 52, 'gpu_cluster');
    this.add.image(2050, this.FLOOR_Y - 24, 'npc_eng');

    this.add.image(2800, 190, 'board_screen');
    this.add.image(2950, this.FLOOR_Y - 24, 'npc_ceo');
  }

  createDoorBarriers() {
    this.doorGroup = this.physics.add.staticGroup();

    this.doors.forEach(doorData => {
      // Create physics wall barrier for locked doors
      const barrier = this.add.rectangle(doorData.x, this.FLOOR_Y - 70, 16, 140, 0xff0000, 0);
      this.doorGroup.add(barrier);
      barrier.doorId = doorData.id;

      // Security Status Badge Overlay above door
      const badge = this.add.image(doorData.x, this.FLOOR_Y - 130, 'door_locked');
      doorData.badge = badge;
      doorData.barrier = barrier;
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(200, this.FLOOR_Y - 24, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.floorLayer);
    this.physics.add.collider(this.player, this.doorGroup);
    this.playerSpeed = 220;

    // Register Player Animations
    if (!this.anims.exists('player_walk')) {
      this.anims.create({
        key: 'player_walk',
        frames: [
          { key: 'player_walk_1' },
          { key: 'player_walk_2' },
          { key: 'player_walk_3' },
          { key: 'player_walk_2' }
        ],
        frameRate: 8,
        repeat: -1
      });
    }

    if (!this.anims.exists('player_idle')) {
      this.anims.create({
        key: 'player_idle',
        frames: [{ key: 'player_idle' }],
        frameRate: 1
      });
    }
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  createPromptUI() {
    this.promptContainer = this.add.container(0, 0).setVisible(false);

    this.promptText = this.add.text(0, 0, '', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#00ffcc',
      fontStyle: 'bold',
      backgroundColor: '#1b1d28',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    this.promptContainer.add(this.promptText);
  }

  setupInteractables() {
    this.interactables = [
      {
        id: 'whiteboard',
        x: 150,
        y: this.FLOOR_Y - 30,
        radius: 80,
        prompt: '[E] AI Strategy Roadmap Quiz',
        action: () => this.openQuizModal('whiteboard')
      },
      {
        id: 'cto_laptop',
        x: 450,
        y: this.FLOOR_Y - 26,
        radius: 70,
        prompt: '[E] Code Audit Quiz',
        action: () => this.openQuizModal('cto_laptop')
      },
      {
        id: 'door1',
        x: 800,
        y: this.FLOOR_Y - 40,
        radius: 70,
        prompt: '[E] Unlock Dev Bay Door',
        action: () => this.handleDoorInteraction('door1')
      },
      {
        id: 'dev_team',
        x: 1150,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Train Devs on AI Copilot',
        action: () => this.openQuizModal('dev_team')
      },
      {
        id: 'coffee',
        x: 1550,
        y: this.FLOOR_Y - 22,
        radius: 60,
        prompt: '[E] Grab Coffee (Speed Boost)',
        action: () => this.handleCoffeeInteraction()
      },
      {
        id: 'door2',
        x: 1600,
        y: this.FLOOR_Y - 40,
        radius: 70,
        prompt: '[E] Unlock Server Room Door',
        action: () => this.handleDoorInteraction('door2')
      },
      {
        id: 'server_engineer',
        x: 2050,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Deploy AI GPU Cluster',
        action: () => this.openQuizModal('server_engineer')
      },
      {
        id: 'door3',
        x: 2400,
        y: this.FLOOR_Y - 40,
        radius: 70,
        prompt: '[E] Unlock Boardroom Door',
        action: () => this.handleDoorInteraction('door3')
      },
      {
        id: 'boardroom_ceo',
        x: 2950,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Pitch AI ROI to CEO',
        action: () => this.openQuizModal('boardroom_ceo')
      }
    ];
  }

  setupQuizQuestions() {
    this.quizQuestions = {
      whiteboard: {
        title: '📋 WHITEBOARD: AI STRATEGY ROADMAP',
        question: 'How should we handle legacy monolith migration to AI microservices?',
        options: [
          { text: '1) Implement RAG pipeline & auto-generate CI/CD tests', correct: true, feedback: 'Correct! RAG pipeline accelerates legacy transition!' },
          { text: '2) Rewrite 500k lines of code manually in Assembly', correct: false, penaltyMins: 30, penaltyProd: 10, feedback: 'Failed! Manual rewrite caused huge project delay (+30m).' },
          { text: '3) Ignore legacy systems and hope AI solves it by magic', correct: false, penaltyMins: 45, penaltyProd: 15, feedback: 'Failed! Systems crashed without maintenance (+45m).' }
        ]
      },
      cto_laptop: {
        title: '💻 CTO LAPTOP: CODE REPOSITORY AUDIT',
        question: 'Which model architecture is safest for on-premise code synthesis?',
        options: [
          { text: '1) Send all proprietary source code to unvetted public cloud API', correct: false, penaltyMins: 30, penaltyVal: 1000000, feedback: 'Failed! Data leak triggered corporate security alarm! (-$1.0M)' },
          { text: '2) Fine-tuned 14B parameter Code-LLM hosted on local GPUs', correct: true, feedback: 'Correct! High performance with total data privacy!' },
          { text: '3) Use a random regex script from Stack Overflow', correct: false, penaltyMins: 25, penaltyProd: 10, feedback: 'Failed! Script caused syntax errors across repos (+25m).' }
        ]
      },
      dev_team: {
        title: '👩‍💻 DEV BAY: AI COPILOT ONBOARDING',
        question: 'Devs fear AI code hallucinations. How do you ensure code quality?',
        options: [
          { text: '1) Tell devs to accept all AI suggestions without checking', correct: false, penaltyMins: 30, penaltyProd: 15, feedback: 'Failed! Blind trust produced critical bugs (+30m, -15% prod).' },
          { text: '2) Mandatory automated unit testing & Human-in-the-Loop review', correct: true, feedback: 'Correct! Devs gain 2x speed with zero quality loss!' },
          { text: '3) Ban AI completely and force devs to use punch cards', correct: false, penaltyMins: 30, penaltyProd: 20, feedback: 'Failed! Developers threatened to quit (+30m, -20% prod).' }
        ]
      },
      server_engineer: {
        title: '🖥️ SERVER ROOM: AI CLUSTER DEPLOYMENT',
        question: 'The GPU cluster overheats during fine-tuning. How do you resolve it?',
        options: [
          { text: '1) Pour iced coffee directly onto GPU PCIe slots', correct: false, penaltyMins: 40, penaltyVal: 500000, feedback: 'Failed! Hardware fried by iced coffee! (-$500k)' },
          { text: '2) Optimize batch size, FP16 precision & liquid cooling loops', correct: true, feedback: 'Correct! Maximum TFLOPS achieved at optimal thermals!' },
          { text: '3) Turn off server fans to make the room quiet', correct: false, penaltyMins: 35, penaltyProd: 10, feedback: 'Failed! Server rack melted and shut down (+35m).' }
        ]
      },
      boardroom_ceo: {
        title: '📊 BOARDROOM: CEO PITCH',
        question: 'The CEO asks: "How does AI guarantee our market leadership?"',
        options: [
          { text: '1) "AI boosts productivity by 3x & delivers customized solutions."', correct: true, feedback: 'Success! Board approves full AI transformation!' },
          { text: '2) "We will replace all humans with a basic chatbot."', correct: false, penaltyMins: 30, penaltyVal: 2000000, feedback: 'Failed! Share price plunged on bad PR (-$2.0M).' },
          { text: '3) "AI is just a buzzword, let\'s stick to fax machines."', correct: false, penaltyMins: 30, penaltyProd: 10, feedback: 'Failed! CEO lost confidence in your vision (+30m).' }
        ]
      }
    };
  }

  createQuizModal() {
    this.quizModalContainer = this.add.container(480, 270).setScrollFactor(0).setDepth(100).setVisible(false);

    // Modal Background
    const bg = this.add.graphics();
    bg.fillStyle(0x0f111a, 0.95);
    bg.fillRect(-320, -180, 640, 360);
    bg.lineStyle(3, 0x88c0d0, 1);
    bg.strokeRect(-320, -180, 640, 360);

    // Quiz Header
    this.quizTitleText = this.add.text(0, -150, '', {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Question
    this.quizQuestionText = this.add.text(0, -100, '', {
      fontFamily: 'Courier New',
      fontSize: '15px',
      color: '#ffffff',
      wordWrap: { width: 580 },
      align: 'center'
    }).setOrigin(0.5);

    // Options Container Texts
    this.quizOptionTexts = [];
    for (let i = 0; i < 3; i++) {
      const optText = this.add.text(-270, -30 + i * 50, '', {
        fontFamily: 'Courier New',
        fontSize: '13px',
        color: '#88c0d0',
        backgroundColor: '#1b1d28',
        padding: { x: 10, y: 8 },
        wordWrap: { width: 520 }
      }).setInteractive({ useHandCursor: true });

      const optIdx = i;
      optText.on('pointerdown', () => this.selectQuizOption(optIdx));
      optText.on('pointerover', () => optText.setColor('#00ffcc'));
      optText.on('pointerout', () => optText.setColor('#88c0d0'));

      this.quizOptionTexts.push(optText);
    }

    // Feedback Text
    this.quizFeedbackText = this.add.text(0, 130, '', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);

    this.quizModalContainer.add([
      bg,
      this.quizTitleText,
      this.quizQuestionText,
      ...this.quizOptionTexts,
      this.quizFeedbackText
    ]);
  }

  openQuizModal(taskId) {
    if (this.gameEnded || this.activeQuiz) return;

    if (this.completedTasks[taskId]) {
      soundManager.playWrong();
      this.showNotification(this.player.x, this.player.y - 40, 'Already completed this task!', '#ebcb8b');
      return;
    }

    // Check prerequisites
    if (taskId === 'dev_team' && !this.completedTasks.whiteboard) {
      soundManager.playWrong();
      this.showNotification(1150, this.FLOOR_Y - 80, 'Plan AI Roadmap on Whiteboard first!', '#bf616a');
      return;
    }
    if (taskId === 'server_engineer' && !this.completedTasks.dev_team) {
      soundManager.playWrong();
      this.showNotification(2050, this.FLOOR_Y - 80, 'Train Devs on AI Copilot first!', '#bf616a');
      return;
    }
    if (taskId === 'boardroom_ceo' && this.aiAdoption < 75) {
      soundManager.playWrong();
      this.showNotification(2950, this.FLOOR_Y - 80, 'CEO wants >= 75% AI Adoption before pitch!', '#bf616a');
      return;
    }

    const quizData = this.quizQuestions[taskId];
    if (!quizData) return;

    soundManager.playSelect();
    this.activeQuiz = { taskId, quizData };

    this.quizTitleText.setText(quizData.title);
    this.quizQuestionText.setText(quizData.question);
    this.quizFeedbackText.setText('');

    quizData.options.forEach((opt, idx) => {
      this.quizOptionTexts[idx].setText(opt.text).setColor('#88c0d0').setVisible(true);
    });

    this.quizModalContainer.setVisible(true);
  }

  selectQuizOption(index) {
    if (!this.activeQuiz || this.gameEnded) return;

    const { taskId, quizData } = this.activeQuiz;
    const chosen = quizData.options[index];

    if (!chosen) return;

    if (chosen.correct) {
      soundManager.playCorrect();
      this.quizFeedbackText.setText(chosen.feedback).setColor('#a3be8c');

      // Execute task benefits
      this.applyTaskSuccess(taskId);

      this.time.delayedCall(1200, () => {
        this.closeQuizModal();
      });
    } else {
      soundManager.playWrong();
      this.quizFeedbackText.setText(chosen.feedback).setColor('#bf616a');

      // Apply penalties
      if (chosen.penaltyMins) {
        this.timeMinutes += chosen.penaltyMins;
      }
      if (chosen.penaltyProd) {
        this.productivity = Math.max(0, this.productivity - chosen.penaltyProd);
      }
      if (chosen.penaltyVal) {
        this.companyValue = Math.max(0, this.companyValue - chosen.penaltyVal);
      }

      this.updateHUDDisplay();

      // Check if time expired from penalty
      if (this.timeMinutes >= this.END_TIME_MINUTES) {
        this.time.delayedCall(1200, () => {
          this.closeQuizModal();
          this.checkEndCondition();
        });
      }
    }
  }

  applyTaskSuccess(taskId) {
    this.completedTasks[taskId] = true;

    switch (taskId) {
      case 'whiteboard':
        this.aiAdoption += 15;
        this.productivity += 10;
        this.companyValue += 1000000;
        this.inventory.key_dev_bay = true;
        this.showNotification(150, this.FLOOR_Y - 80, '✨ DEV BAY KEYCARD OBTAINED!\n+15% AI Adoption, +10% Prod', '#a3be8c');
        break;

      case 'cto_laptop':
        this.productivity += 15;
        this.companyValue += 500000;
        this.showNotification(450, this.FLOOR_Y - 80, '✨ Code Audit Complete!\n+15% Productivity, +$500k Val', '#88c0d0');
        break;

      case 'dev_team':
        this.aiAdoption += 30;
        this.productivity += 25;
        this.companyValue += 2500000;
        this.inventory.key_server_room = true;
        this.showNotification(1150, this.FLOOR_Y - 80, '✨ SERVER ROOM CLEARANCE OBTAINED!\n+30% Adoption, +25% Prod', '#a3be8c');
        break;

      case 'server_engineer':
        this.aiAdoption += 30;
        this.productivity += 20;
        this.companyValue += 3000000;
        this.inventory.key_boardroom = true;
        this.showNotification(2050, this.FLOOR_Y - 80, '✨ BOARDROOM PASS OBTAINED!\n+30% Adoption, +$3.0M Val', '#88c0d0');
        break;

      case 'boardroom_ceo':
        this.aiAdoption = 100;
        this.productivity += 30;
        this.companyValue += 10000000;
        this.showNotification(2950, this.FLOOR_Y - 80, '🎉 CEO APPROVED PITCH!\n100% AI ADOPTION ACHIEVED!', '#a3be8c');
        break;
    }

    this.aiAdoption = Math.min(100, this.aiAdoption);
    this.updateHUDDisplay();

    if (this.aiAdoption >= 100) {
      this.time.delayedCall(1200, () => {
        this.checkEndCondition();
      });
    }
  }

  closeQuizModal() {
    this.activeQuiz = null;
    this.quizModalContainer.setVisible(false);
  }

  handleDoorInteraction(doorId) {
    if (this.gameEnded) return;

    const doorData = this.doors.find(d => d.id === doorId);
    if (!doorData) return;

    if (!doorData.locked) {
      soundManager.playSelect();
      this.showNotification(doorData.x, this.FLOOR_Y - 80, 'Door is already unlocked!', '#a3be8c');
      return;
    }

    if (this.inventory[doorData.key]) {
      doorData.locked = false;
      soundManager.playDoorUnlock();

      // Disable physics barrier
      if (doorData.barrier) {
        doorData.barrier.destroy();
      }

      // Update badge texture
      if (doorData.badge) {
        doorData.badge.setTexture('door_unlocked');
      }

      this.showNotification(doorData.x, this.FLOOR_Y - 80, `🔓 ${doorData.name} UNLOCKED!`, '#a3be8c');
    } else {
      soundManager.playWrong();
      let hint = '';
      if (doorId === 'door1') hint = 'Complete Strategy Roadmap on Whiteboard first!';
      if (doorId === 'door2') hint = 'Complete Dev Team AI Copilot training first!';
      if (doorId === 'door3') hint = 'Deploy AI Cluster in Server Room first!';

      this.showNotification(doorData.x, this.FLOOR_Y - 80, `🔒 ACCESS DENIED!\n${hint}`, '#bf616a');
    }
  }

  handleCoffeeInteraction() {
    if (this.gameEnded) return;

    soundManager.playPowerup();
    this.playerSpeed = 340;
    this.showNotification(1550, this.FLOOR_Y - 80, 'Espresso Power! ⚡ Speed Boost', '#ebcb8b');
    this.time.delayedCall(12000, () => {
      this.playerSpeed = 220;
    });
  }

  showNotification(x, y, message, color = '#ffffff') {
    const notifText = this.add.text(x, y, message, {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: color,
      fontStyle: 'bold',
      backgroundColor: '#0f111a',
      padding: { x: 10, y: 6 },
      align: 'center'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: notifText,
      y: y - 40,
      alpha: 0,
      duration: 2500,
      ease: 'Power2',
      onComplete: () => notifText.destroy()
    });
  }

  createHUD() {
    this.hudContainer = this.add.container(0, 0).setScrollFactor(0);

    // Top Bar
    const hudBg = this.add.graphics();
    hudBg.fillStyle(0x0f111a, 0.9);
    hudBg.fillRect(0, 0, 960, 50);
    hudBg.lineStyle(2, 0x3b4252, 1);
    hudBg.strokeLineShape(new Phaser.Geom.Line(0, 50, 960, 50));
    this.hudContainer.add(hudBg);

    // Loop Text
    this.loopText = this.add.text(15, 15, `LOOP #${this.loopCount}`, {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#ebcb8b',
      fontStyle: 'bold'
    });

    // Clock Display
    this.clockText = this.add.text(130, 15, 'TIME: 09:00 AM', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#88c0d0',
      fontStyle: 'bold'
    });

    // AI Adoption Progress Bar
    this.adoptionText = this.add.text(310, 15, 'AI ADOPTION: 0%', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#a3be8c',
      fontStyle: 'bold'
    });

    // Productivity %
    this.prodText = this.add.text(530, 15, 'PROD: 30%', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#b48ead',
      fontStyle: 'bold'
    });

    // Company Valuation ($)
    this.valueText = this.add.text(700, 15, 'VAL: $10.0M', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#d8dee9',
      fontStyle: 'bold'
    });

    this.hudContainer.add([
      this.loopText,
      this.clockText,
      this.adoptionText,
      this.prodText,
      this.valueText
    ]);
  }

  tickClock() {
    if (this.gameEnded) return;

    this.timeMinutes += 5; // advance 5 mins per tick
    this.updateHUDDisplay();

    if (this.timeMinutes >= this.END_TIME_MINUTES) {
      this.checkEndCondition();
    }
  }

  formatTime(minutesTotal) {
    const hours = Math.floor(minutesTotal / 60);
    const mins = minutesTotal % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    const paddedMins = mins < 10 ? `0${mins}` : mins;
    const paddedHours = displayHours < 10 ? `0${displayHours}` : displayHours;
    return `${paddedHours}:${paddedMins} ${period}`;
  }

  updateHUDDisplay() {
    this.clockText.setText(`TIME: ${this.formatTime(this.timeMinutes)}`);
    this.adoptionText.setText(`AI ADOPTION: ${Math.round(this.aiAdoption)}%`);
    this.prodText.setText(`PROD: ${Math.round(this.productivity)}%`);

    let valStr = '';
    if (this.companyValue >= 1000000) {
      valStr = `$${(this.companyValue / 1000000).toFixed(1)}M`;
    } else {
      valStr = `$${Math.round(this.companyValue).toLocaleString()}`;
    }
    this.valueText.setText(`VAL: ${valStr}`);
  }

  checkEndCondition() {
    if (this.gameEnded) return;

    if (this.aiAdoption >= 100) {
      this.gameEnded = true;
      if (this.timeTimer) this.timeTimer.remove();
      this.scene.start('VictoryScene', { loopCount: this.loopCount, value: this.companyValue });
    } else if (this.timeMinutes >= this.END_TIME_MINUTES) {
      this.gameEnded = true;
      if (this.timeTimer) this.timeTimer.remove();
      this.scene.start('GameOverScene', { loopCount: this.loopCount, adoption: this.aiAdoption });
    }
  }

  update(time) {
    this.handleMovement(time);
    this.checkProximityInteractables();
    this.handleQuizKeyboardInput();
  }

  handleMovement(time) {
    if (!this.player || this.gameEnded || this.activeQuiz) {
      if (this.player && this.activeQuiz) {
        this.player.setVelocityX(0);
        this.player.anims.play('player_idle', true);
      }
      return;
    }

    let moveX = 0;

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      moveX = -this.playerSpeed;
      this.player.setFlipX(true);
      this.player.anims.play('player_walk', true);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      moveX = this.playerSpeed;
      this.player.setFlipX(false);
      this.player.anims.play('player_walk', true);
    } else {
      this.player.anims.play('player_idle', true);
    }

    this.player.setVelocityX(moveX);

    // Play footstep sounds when walking
    if (moveX !== 0) {
      if (time > this.lastStepTime + 260) {
        soundManager.playStep();
        this.lastStepTime = time;
      }
    }
  }

  handleQuizKeyboardInput() {
    if (!this.activeQuiz || this.gameEnded) return;

    if (Phaser.Input.Keyboard.JustDown(this.wasd.num1)) {
      this.selectQuizOption(0);
    } else if (Phaser.Input.Keyboard.JustDown(this.wasd.num2)) {
      this.selectQuizOption(1);
    } else if (Phaser.Input.Keyboard.JustDown(this.wasd.num3)) {
      this.selectQuizOption(2);
    }
  }

  checkProximityInteractables() {
    if (!this.player || this.gameEnded || this.activeQuiz) {
      this.promptContainer.setVisible(false);
      return;
    }

    let closest = null;
    let minDistance = Infinity;

    this.interactables.forEach(item => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
      if (dist <= item.radius && dist < minDistance) {
        minDistance = dist;
        closest = item;
      }
    });

    this.activeInteractable = closest;

    if (closest) {
      this.promptContainer.setPosition(closest.x, closest.y - 60);
      this.promptText.setText(closest.prompt);
      this.promptContainer.setVisible(true);

      if (Phaser.Input.Keyboard.JustDown(this.wasd.interact)) {
        closest.action();
      }
    } else {
      this.promptContainer.setVisible(false);
    }
  }
}
