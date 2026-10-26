import Phaser from 'phaser';

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

    // Core Game Metrics
    this.aiAdoption = 0; // Target: 100%
    this.productivity = 30; // Starting productivity %
    this.companyValue = 10000000; // $10,000,000
    this.timeMinutes = 9 * 60; // 9:00 AM in minutes
    this.END_TIME_MINUTES = 17 * 60; // 5:00 PM in minutes
    this.gameEnded = false;

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
      interact: Phaser.Input.Keyboard.KeyCodes.E
    });

    // Create Prompt Floating Text Overlay
    this.createPromptUI();

    // Setup HUD overlay
    this.createHUD();

    // Setup Interactive Objects
    this.setupInteractables();

    // Workday Clock Timer Event (Every 1 second = 5 in-game minutes)
    this.timeTimer = this.time.addEvent({
      delay: 1000,
      callback: this.tickClock,
      callbackScope: this,
      loop: true
    });
  }

  createOfficeLayout() {
    const bgGraphics = this.add.graphics();

    // 1. CTO Office (x: 0 - 800)
    bgGraphics.fillStyle(0x1f293d, 1); // Dark Navy Wall
    bgGraphics.fillRect(0, 0, 800, 540);
    // Lower Wood Paneling
    bgGraphics.fillStyle(0x2c1f14, 1);
    bgGraphics.fillRect(0, 280, 800, 180);
    bgGraphics.fillStyle(0x3d2b1d, 1); // Molding Trim
    bgGraphics.fillRect(0, 276, 800, 6);
    // Wood Floor Planks
    bgGraphics.fillStyle(0x4a3222, 1);
    bgGraphics.fillRect(0, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x3a2619, 1);
    for (let x = 0; x < 800; x += 60) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }

    // 2. Dev Bay (x: 800 - 1600)
    bgGraphics.fillStyle(0x1e222a, 1); // Tech Dark Grey
    bgGraphics.fillRect(800, 0, 800, 540);
    bgGraphics.fillStyle(0x00d2d3, 0.7); // Cyan LED Duct Stripe
    bgGraphics.fillRect(800, 50, 800, 4);
    // Anti-static Tile Flooring
    bgGraphics.fillStyle(0x2d3748, 1);
    bgGraphics.fillRect(800, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x1a202c, 1);
    for (let x = 800; x < 1600; x += 40) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }
    bgGraphics.fillRect(800, this.FLOOR_Y + 40, 800, 2);

    // 3. Server Room (x: 1600 - 2400)
    bgGraphics.fillStyle(0x111625, 1); // Industrial Deep Blue
    bgGraphics.fillRect(1600, 0, 800, 540);
    // Overhead Liquid Cooling Conduit Pipes
    bgGraphics.fillStyle(0x34495e, 1);
    bgGraphics.fillRect(1600, 30, 800, 10);
    bgGraphics.fillStyle(0x00f2fe, 1); // Glowing coolant core
    bgGraphics.fillRect(1600, 33, 800, 4);
    // Raised Metal Server Floor Tiles
    bgGraphics.fillStyle(0x1a202c, 1);
    bgGraphics.fillRect(1600, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x2d3748, 1);
    for (let x = 1600; x < 2400; x += 50) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }
    bgGraphics.fillRect(1600, this.FLOOR_Y + 40, 800, 2);

    // 4. Boardroom (x: 2400 - 3200)
    bgGraphics.fillStyle(0x2e1f3d, 1); // Executive Slate Purple
    bgGraphics.fillRect(2400, 0, 800, 540);
    bgGraphics.fillStyle(0xd4af37, 0.8); // Gold Crown Molding Trim
    bgGraphics.fillRect(2400, 40, 800, 4);
    // Polished Dark Wood Floor
    bgGraphics.fillStyle(0x3a2318, 1);
    bgGraphics.fillRect(2400, this.FLOOR_Y, 800, 80);
    bgGraphics.fillStyle(0x29180e, 1);
    for (let x = 2400; x < 3200; x += 80) {
      bgGraphics.fillRect(x, this.FLOOR_Y, 2, 80);
    }

    // Top Header Wall Borders across all rooms
    bgGraphics.fillStyle(0x0f111a, 0.9);
    bgGraphics.fillRect(0, 0, this.WORLD_WIDTH, 40);
    bgGraphics.fillStyle(0x3b4252, 1);
    bgGraphics.fillRect(0, 38, this.WORLD_WIDTH, 2);

    // Skirting Baseboard along entire floor line
    bgGraphics.fillStyle(0x1a1c23, 1);
    bgGraphics.fillRect(0, this.FLOOR_Y - 4, this.WORLD_WIDTH, 4);

    // Floor physics setup
    const floor = this.physics.add.staticGroup();
    const floorRect = this.add.rectangle(this.WORLD_WIDTH / 2, this.FLOOR_Y + 40, this.WORLD_WIDTH, 80, 0x000000, 0);
    floor.add(floorRect);
    this.floorLayer = floor;

    // Room Partition Labels (Positioned right below top HUD bar)
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

    // Place Doors between rooms
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

  createPlayer() {
    this.player = this.physics.add.sprite(200, this.FLOOR_Y - 24, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.floorLayer);
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
        prompt: '[E] Plan AI Roadmap',
        action: () => this.handleTaskInteraction('whiteboard')
      },
      {
        id: 'cto_laptop',
        x: 450,
        y: this.FLOOR_Y - 26,
        radius: 70,
        prompt: '[E] Audit Code Repositories',
        action: () => this.handleTaskInteraction('cto_laptop')
      },
      {
        id: 'dev_team',
        x: 1150,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Train Devs on AI Copilot',
        action: () => this.handleTaskInteraction('dev_team')
      },
      {
        id: 'coffee',
        x: 1550,
        y: this.FLOOR_Y - 22,
        radius: 60,
        prompt: '[E] Grab Coffee (Speed Boost)',
        action: () => this.handleTaskInteraction('coffee')
      },
      {
        id: 'server_engineer',
        x: 2050,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Deploy Local AI Cluster',
        action: () => this.handleTaskInteraction('server_engineer')
      },
      {
        id: 'boardroom_ceo',
        x: 2950,
        y: this.FLOOR_Y - 24,
        radius: 80,
        prompt: '[E] Pitch AI ROI to CEO',
        action: () => this.handleTaskInteraction('boardroom_ceo')
      }
    ];
  }

  handleTaskInteraction(taskId) {
    if (this.gameEnded) return;

    if (this.completedTasks[taskId] && taskId !== 'coffee') {
      this.showNotification(this.player.x, this.player.y - 40, 'Already completed this task!', '#ebcb8b');
      return;
    }

    switch (taskId) {
      case 'whiteboard':
        this.completedTasks.whiteboard = true;
        this.aiAdoption += 15;
        this.productivity += 10;
        this.companyValue += 1000000;
        this.showNotification(150, this.FLOOR_Y - 80, '+15% AI Adoption!\n+10% Productivity', '#a3be8c');
        break;

      case 'cto_laptop':
        this.completedTasks.cto_laptop = true;
        this.productivity += 15;
        this.companyValue += 500000;
        this.showNotification(450, this.FLOOR_Y - 80, 'Code Audit Done!\n+15% Productivity', '#88c0d0');
        break;

      case 'dev_team':
        if (!this.completedTasks.whiteboard) {
          this.showNotification(1150, this.FLOOR_Y - 80, 'Plan AI Roadmap on Whiteboard first!', '#bf616a');
          return;
        }
        this.completedTasks.dev_team = true;
        this.aiAdoption += 30;
        this.productivity += 25;
        this.companyValue += 2500000;
        this.showNotification(1150, this.FLOOR_Y - 80, 'AI Copilot Onboarded!\n+30% Adoption, +25% Prod', '#a3be8c');
        break;

      case 'coffee':
        this.playerSpeed = 340;
        this.showNotification(1550, this.FLOOR_Y - 80, 'Espresso Power! ⚡ Speed Boost', '#ebcb8b');
        this.time.delayedCall(12000, () => {
          this.playerSpeed = 220;
        });
        break;

      case 'server_engineer':
        if (!this.completedTasks.dev_team) {
          this.showNotification(2050, this.FLOOR_Y - 80, 'Dev team must adopt AI Copilot first!', '#bf616a');
          return;
        }
        this.completedTasks.server_engineer = true;
        this.aiAdoption += 30;
        this.productivity += 20;
        this.companyValue += 3000000;
        this.showNotification(2050, this.FLOOR_Y - 80, 'GPU AI Nodes Live!\n+30% Adoption, +$3.0M Val', '#88c0d0');
        break;

      case 'boardroom_ceo':
        if (this.aiAdoption < 75) {
          this.showNotification(2950, this.FLOOR_Y - 80, 'CEO wants >= 75% AI Adoption before pitch!', '#bf616a');
          return;
        }
        this.completedTasks.boardroom_ceo = true;
        this.aiAdoption = 100;
        this.productivity += 30;
        this.companyValue += 10000000;
        this.showNotification(2950, this.FLOOR_Y - 80, 'CEO Approved Pitch!\n100% AI ADOPTION ACHIEVED!', '#a3be8c');
        this.checkEndCondition();
        break;
    }

    this.aiAdoption = Math.min(100, this.aiAdoption);
    this.updateHUDDisplay();

    if (this.aiAdoption >= 100) {
      this.checkEndCondition();
    }
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

  update() {
    this.handleMovement();
    this.checkProximityInteractables();
  }

  handleMovement() {
    if (!this.player || this.gameEnded) return;

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
  }

  checkProximityInteractables() {
    if (!this.player || this.gameEnded) return;

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
