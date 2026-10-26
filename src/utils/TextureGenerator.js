export function createGameTextures(scene) {
  // Helper to draw detailed CTO Character frame
  function drawCTOCharacterFrame(graphics, legOffset = 0, armAngle = 0) {
    // Colors
    const hairColor = 0x2b303a;
    const hairHighlight = 0x4f5b66;
    const skinTone = 0xffdbac;
    const skinShadow = 0xdbb288;
    const suitJacket = 0x1f2a38;
    const suitShadow = 0x141c26;
    const suitHighlight = 0x334458;
    const shirtColor = 0xf0f4f8;
    const tieColor = 0xd63031;
    const tieShadow = 0x900c3f;
    const beltColor = 0x222222;
    const buckleColor = 0xf39c12;
    const pantsColor = 0x19222d;
    const pantsShadow = 0x0f151d;
    const shoeColor = 0x0a0a0d;
    const shoeHighlight = 0x444455;

    // Head & Hair
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(10, 4, 12, 11); // Face base
    graphics.fillStyle(skinShadow, 1);
    graphics.fillRect(10, 13, 12, 2); // Chin shadow

    // Face details
    graphics.fillStyle(0x1a1a24, 1);
    graphics.fillRect(18, 7, 2, 3); // Eye
    graphics.fillStyle(0x333344, 1);
    graphics.fillRect(17, 6, 4, 1); // Eyebrow

    // Hair styling
    graphics.fillStyle(hairColor, 1);
    graphics.fillRect(9, 1, 14, 4); // Hair top
    graphics.fillRect(8, 3, 4, 8); // Sideburn/back hair
    graphics.fillStyle(hairHighlight, 1);
    graphics.fillRect(12, 1, 8, 2); // Hair shine highlight

    // Collar & Neck
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(14, 14, 4, 2); // Neck

    // White Shirt & Red Tie
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(13, 16, 6, 8); // V-neck shirt line
    graphics.fillStyle(tieColor, 1);
    graphics.fillRect(15, 17, 2, 8); // Red tie
    graphics.fillStyle(tieShadow, 1);
    graphics.fillRect(16, 18, 1, 7); // Tie depth shadow
    graphics.fillStyle(0xf1c40f, 1);
    graphics.fillRect(15, 20, 2, 1); // Gold tie clip

    // Suit Jacket Torso
    graphics.fillStyle(suitJacket, 1);
    graphics.fillRect(9, 16, 4, 18); // Left chest / lapel
    graphics.fillRect(19, 16, 4, 18); // Right chest / side
    graphics.fillStyle(suitHighlight, 1);
    graphics.fillRect(9, 16, 2, 10); // Shoulder highlight
    graphics.fillStyle(suitShadow, 1);
    graphics.fillRect(20, 17, 3, 17); // Back shadow
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(10, 20, 2, 2); // Pocket square

    // Belt
    graphics.fillStyle(beltColor, 1);
    graphics.fillRect(9, 34, 14, 2);
    graphics.fillStyle(buckleColor, 1);
    graphics.fillRect(15, 34, 2, 2);

    // Arms (swing according to armAngle)
    const backArmX = 21 + Math.round(armAngle * 2);
    const frontArmX = 7 - Math.round(armAngle * 2);
    graphics.fillStyle(suitShadow, 1);
    graphics.fillRect(backArmX, 17, 4, 14); // Back arm
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(backArmX + 1, 31, 2, 3); // Back hand

    graphics.fillStyle(suitJacket, 1);
    graphics.fillRect(frontArmX, 17, 4, 14); // Front arm
    graphics.fillStyle(shirtColor, 1);
    graphics.fillRect(frontArmX + 1, 30, 2, 2); // Cuff highlight
    graphics.fillStyle(skinTone, 1);
    graphics.fillRect(frontArmX + 1, 32, 2, 3); // Front hand

    // Legs (Leg offset for walk cycle)
    const leftLegX = 10 - legOffset;
    const rightLegX = 16 + legOffset;

    // Back leg
    graphics.fillStyle(pantsShadow, 1);
    graphics.fillRect(rightLegX, 36, 5, 8);
    graphics.fillStyle(shoeColor, 1);
    graphics.fillRect(rightLegX - 1, 44, 7, 4);

    // Front leg
    graphics.fillStyle(pantsColor, 1);
    graphics.fillRect(leftLegX, 36, 5, 8);
    graphics.fillStyle(shoeColor, 1);
    graphics.fillRect(leftLegX - 1, 44, 7, 4);
    graphics.fillStyle(shoeHighlight, 1);
    graphics.fillRect(leftLegX, 44, 4, 1); // Shoe shine
  }

  // Generate Idle & Walk Cycle Textures for CTO Player
  const pIdleG = scene.make.graphics({ x: 0, y: 0, add: false });
  drawCTOCharacterFrame(pIdleG, 0, 0);
  pIdleG.generateTexture('player_idle', 32, 48);
  pIdleG.generateTexture('player', 32, 48); // Fallback key

  const pWalk1G = scene.make.graphics({ x: 0, y: 0, add: false });
  drawCTOCharacterFrame(pWalk1G, 2, 1);
  pWalk1G.generateTexture('player_walk_1', 32, 48);

  const pWalk2G = scene.make.graphics({ x: 0, y: 0, add: false });
  drawCTOCharacterFrame(pWalk2G, 0, 0);
  pWalk2G.generateTexture('player_walk_2', 32, 48);

  const pWalk3G = scene.make.graphics({ x: 0, y: 0, add: false });
  drawCTOCharacterFrame(pWalk3G, -2, -1);
  pWalk3G.generateTexture('player_walk_3', 32, 48);

  // 2. CTO Office Desk & Laptop (Mahogany executive desk, open laptop with illuminated code screen, lamp, coffee mug)
  const ctoDesk = scene.make.graphics({ x: 0, y: 0, add: false });
  // Desk Surface & Bevels
  ctoDesk.fillStyle(0x4a3222, 1); // Dark Mahogany Wood Top
  ctoDesk.fillRect(0, 20, 96, 8);
  ctoDesk.fillStyle(0x6e4a33, 1); // Wood Highlight Bevel
  ctoDesk.fillRect(0, 20, 96, 2);
  ctoDesk.fillStyle(0x2f2015, 1); // Desk Under Shadow
  ctoDesk.fillRect(0, 28, 96, 3);
  // Legs & Drawer Cabinet
  ctoDesk.fillStyle(0x3d291c, 1); // Left cabinet
  ctoDesk.fillRect(6, 31, 20, 21);
  ctoDesk.fillStyle(0x2f2015, 1); // Drawer dividers
  ctoDesk.fillRect(6, 38, 20, 1);
  ctoDesk.fillRect(6, 45, 20, 1);
  ctoDesk.fillStyle(0xd8dee9, 1); // Metallic handles
  ctoDesk.fillRect(14, 34, 4, 2);
  ctoDesk.fillRect(14, 41, 4, 2);
  ctoDesk.fillRect(14, 48, 4, 2);

  ctoDesk.fillStyle(0x4c566a, 1); // Metallic Right Leg
  ctoDesk.fillRect(78, 31, 8, 21);
  ctoDesk.fillStyle(0x2e3440, 1);
  ctoDesk.fillRect(84, 31, 2, 21);

  // Laptop Base & Open Screen
  ctoDesk.fillStyle(0xd8dee9, 1); // Aluminum laptop casing
  ctoDesk.fillRect(32, 18, 28, 3); // Base
  ctoDesk.fillStyle(0x2e3440, 1);
  ctoDesk.fillRect(34, 6, 24, 13); // Screen Bezel
  ctoDesk.fillStyle(0x1e222a, 1);
  ctoDesk.fillRect(35, 7, 22, 11); // Inner Display
  // Code lines on laptop screen
  ctoDesk.fillStyle(0x88c0d0, 1); // Cyan header
  ctoDesk.fillRect(37, 8, 12, 1);
  ctoDesk.fillStyle(0xa3be8c, 1); // Green code lines
  ctoDesk.fillRect(37, 10, 16, 1);
  ctoDesk.fillRect(37, 12, 10, 1);
  ctoDesk.fillStyle(0xebcb8b, 1); // Yellow function calls
  ctoDesk.fillRect(37, 14, 14, 1);
  ctoDesk.fillStyle(0xb48ead, 1); // Purple status tag
  ctoDesk.fillRect(37, 16, 8, 1);

  // Desk Lamp (Warm light)
  ctoDesk.fillStyle(0xf39c12, 1); // Gold base & neck
  ctoDesk.fillRect(10, 16, 6, 4);
  ctoDesk.fillRect(12, 8, 2, 8);
  ctoDesk.fillRect(12, 8, 8, 2);
  ctoDesk.fillStyle(0xe67e22, 1); // Lamp shade
  ctoDesk.fillRect(18, 9, 8, 5);
  ctoDesk.fillStyle(0xfff5cc, 0.4); // Warm light cone beam
  ctoDesk.fillTriangle(22, 14, 10, 20, 34, 20);

  // Coffee Mug
  ctoDesk.fillStyle(0xbf616a, 1); // Red mug
  ctoDesk.fillRect(68, 14, 6, 6);
  ctoDesk.fillStyle(0xd8dee9, 1); // White rim/handle
  ctoDesk.fillRect(74, 15, 2, 4);
  ctoDesk.fillStyle(0xe5e9f0, 0.5); // Steam
  ctoDesk.fillRect(69, 11, 1, 2);
  ctoDesk.fillRect(72, 10, 1, 3);
  ctoDesk.generateTexture('cto_desk', 96, 52);

  // 3. AI Whiteboard (Aluminum frame, colorful architecture diagrams, sticky notes, marker tray)
  const whiteboard = scene.make.graphics({ x: 0, y: 0, add: false });
  // Outer frame & shadow
  whiteboard.fillStyle(0x2e3440, 1); // Frame drop shadow
  whiteboard.fillRect(2, 2, 108, 62);
  whiteboard.fillStyle(0xd8dee9, 1); // Metallic Frame
  whiteboard.fillRect(0, 0, 108, 62);
  whiteboard.fillStyle(0xf8f9fa, 1); // Clean white board surface
  whiteboard.fillRect(4, 4, 100, 54);

  // Architecture Diagram Drawings
  // System Flow Nodes (Blue / Cyan)
  whiteboard.fillStyle(0x5e81ac, 1); // Ingestion Box
  whiteboard.fillRect(10, 10, 22, 12);
  whiteboard.fillStyle(0xffffff, 1);
  whiteboard.fillRect(12, 13, 18, 2);
  whiteboard.fillRect(12, 17, 12, 2);

  whiteboard.fillStyle(0x88c0d0, 1); // Model Core Box
  whiteboard.fillRect(42, 10, 24, 18);
  whiteboard.fillStyle(0x2e3440, 1);
  whiteboard.fillRect(45, 14, 18, 3);
  whiteboard.fillRect(45, 19, 12, 2);

  whiteboard.fillStyle(0xa3be8c, 1); // Output / API Box
  whiteboard.fillRect(76, 10, 22, 12);
  whiteboard.fillStyle(0xffffff, 1);
  whiteboard.fillRect(78, 13, 18, 2);

  // Connecting Flow Lines & Arrows
  whiteboard.fillStyle(0xbf616a, 1); // Red arrow lines
  whiteboard.fillRect(32, 15, 10, 2); // Arrow 1
  whiteboard.fillRect(66, 15, 10, 2); // Arrow 2
  whiteboard.fillRect(53, 28, 2, 12); // Down arrow
  whiteboard.fillRect(20, 38, 68, 2); // Feedback loop line

  // Sticky Notes (Yellow & Pink)
  whiteboard.fillStyle(0xebcb8b, 1); // Yellow sticky 1
  whiteboard.fillRect(12, 34, 14, 14);
  whiteboard.fillStyle(0xd08770, 1); // Note writing line
  whiteboard.fillRect(14, 37, 10, 1);
  whiteboard.fillRect(14, 40, 8, 1);

  whiteboard.fillStyle(0xb48ead, 1); // Pink sticky 2
  whiteboard.fillRect(78, 34, 14, 14);
  whiteboard.fillStyle(0xeceff4, 1);
  whiteboard.fillRect(80, 37, 10, 1);
  whiteboard.fillRect(80, 40, 6, 1);

  // Marker Tray at bottom frame
  whiteboard.fillStyle(0x4c566a, 1);
  whiteboard.fillRect(20, 58, 68, 4);
  // Markers (Red, Blue, Green, Black)
  whiteboard.fillStyle(0xbf616a, 1);
  whiteboard.fillRect(28, 56, 8, 2);
  whiteboard.fillStyle(0x81a1c1, 1);
  whiteboard.fillRect(40, 56, 8, 2);
  whiteboard.fillStyle(0xa3be8c, 1);
  whiteboard.fillRect(52, 56, 8, 2);
  whiteboard.generateTexture('whiteboard', 110, 64);

  // 4. Developer Workstation (Dual curved monitors, mechanical keyboard with backlight, office chair silhouette)
  const devStation = scene.make.graphics({ x: 0, y: 0, add: false });
  // Ergonomic Mesh Chair (Behind desk)
  devStation.fillStyle(0x2b303a, 1); // Chair backrest
  devStation.fillRect(48, 8, 20, 24);
  devStation.fillStyle(0x4f5b66, 1); // Chair headrest
  devStation.fillRect(52, 2, 12, 6);
  devStation.fillStyle(0x1a1c23, 1); // Chair spine rod
  devStation.fillRect(56, 32, 4, 16);

  // Desk Top Surface
  devStation.fillStyle(0x2d3748, 1); // Dark Steel-Grey Desk
  devStation.fillRect(0, 24, 116, 8);
  devStation.fillStyle(0x4a5568, 1); // Desk edge highlight
  devStation.fillRect(0, 24, 116, 2);
  devStation.fillStyle(0x1a202c, 1); // Frame Legs
  devStation.fillRect(8, 32, 8, 20);
  devStation.fillRect(100, 32, 8, 20);

  // Dual Monitors Mount & Screen Frames
  // Left Monitor (IDE / Code Screen)
  devStation.fillStyle(0x1a1c23, 1); // Bezel
  devStation.fillRect(8, 2, 46, 22);
  devStation.fillStyle(0x0f111a, 1); // Display area
  devStation.fillRect(10, 4, 42, 18);
  // Code Editor Syntax Highlighting
  devStation.fillStyle(0xb48ead, 1); // Purple import keyword
  devStation.fillRect(12, 6, 10, 1);
  devStation.fillStyle(0x88c0d0, 1); // Cyan class name
  devStation.fillRect(24, 6, 14, 1);
  devStation.fillStyle(0xa3be8c, 1); // Green variable code line
  devStation.fillRect(14, 9, 20, 1);
  devStation.fillRect(14, 11, 16, 1);
  devStation.fillStyle(0xebcb8b, 1); // Yellow function call
  devStation.fillRect(18, 13, 22, 1);
  devStation.fillStyle(0xd08770, 1); // Orange return statement
  devStation.fillRect(14, 15, 12, 1);
  devStation.fillStyle(0xa3be8c, 1); // Green string literal
  devStation.fillRect(14, 17, 24, 1);

  // Right Monitor (AI Metrics / Terminal)
  devStation.fillStyle(0x1a1c23, 1); // Bezel
  devStation.fillRect(58, 2, 46, 22);
  devStation.fillStyle(0x0a100d, 1); // Terminal Screen
  devStation.fillRect(60, 4, 42, 18);
  // Terminal Waveform Graph
  devStation.fillStyle(0x00ffcc, 1); // Cyan pulse line
  devStation.fillRect(62, 12, 4, 1);
  devStation.fillRect(66, 10, 4, 1);
  devStation.fillRect(70, 15, 4, 1);
  devStation.fillRect(74, 8, 4, 1);
  devStation.fillRect(78, 13, 4, 1);
  devStation.fillRect(82, 7, 4, 1);
  devStation.fillRect(86, 11, 4, 1);
  devStation.fillRect(90, 9, 8, 1);
  devStation.fillStyle(0x57cc99, 0.4); // Area fill under graph
  devStation.fillRect(62, 13, 36, 6);

  // Mechanical Keyboard (RGB Underglow)
  devStation.fillStyle(0x88c0d0, 0.6); // RGB Glow on desk
  devStation.fillRect(38, 22, 38, 4);
  devStation.fillStyle(0x2d3748, 1); // Keyboard casing
  devStation.fillRect(40, 22, 34, 3);
  devStation.fillStyle(0xffffff, 1); // Key caps
  devStation.fillRect(41, 23, 32, 1);

  // Ergonomic Mouse & Pad
  devStation.fillStyle(0x1a202c, 1); // Mousepad
  devStation.fillRect(80, 22, 12, 4);
  devStation.fillStyle(0xe2e8f0, 1); // Mouse
  devStation.fillRect(84, 22, 4, 3);
  devStation.generateTexture('dev_station', 116, 52);

  // 5. Coffee Machine (Espresso machine body, glass carafe with coffee, LED screen, hot steam)
  const coffee = scene.make.graphics({ x: 0, y: 0, add: false });
  // Body Frame
  coffee.fillStyle(0x2d3748, 1); // Matte Black Steel Casing
  coffee.fillRect(0, 0, 32, 46);
  coffee.fillStyle(0x4a5568, 1); // Stainless steel front panel
  coffee.fillRect(2, 2, 28, 42);
  coffee.fillStyle(0xe2e8f0, 1); // Chrome Accent Top & Base
  coffee.fillRect(0, 0, 32, 3);
  coffee.fillRect(0, 43, 32, 3);

  // Digital Screen & Status Indicators
  coffee.fillStyle(0x0f111a, 1); // Digital Display Box
  coffee.fillRect(6, 6, 20, 8);
  coffee.fillStyle(0x00ffcc, 1); // Digital text "READY"
  coffee.fillRect(8, 9, 16, 2);
  coffee.fillStyle(0x2ecc71, 1); // Green Status LED
  coffee.fillRect(6, 16, 3, 3);
  coffee.fillStyle(0xf1c40f, 1); // Yellow Brew LED
  coffee.fillRect(12, 16, 3, 3);
  coffee.fillStyle(0xe74c3c, 1); // Red Power LED
  coffee.fillRect(18, 16, 3, 3);

  // Coffee Dispenser Nozzle & Cup Tray
  coffee.fillStyle(0x718096, 1); // Dispenser
  coffee.fillRect(12, 20, 8, 4);
  coffee.fillStyle(0xa0aec0, 1); // Stainless Drip Tray
  coffee.fillRect(4, 38, 24, 4);

  // Glass Coffee Pot with Brown Coffee
  coffee.fillStyle(0xe2e8f0, 0.8); // Glass Pot Contour
  coffee.fillRect(8, 24, 16, 14);
  coffee.fillStyle(0x5c3d2e, 1); // Dark Coffee Liquid Level
  coffee.fillRect(9, 27, 14, 10);
  coffee.fillStyle(0x3e2723, 1); // Darker base
  coffee.fillRect(9, 33, 14, 4);
  coffee.fillStyle(0x2d3748, 1); // Handle
  coffee.fillRect(24, 26, 3, 10);
  coffee.generateTexture('coffee_machine', 32, 46);

  // 6. Server Rack (High-density rack blades, ventilation grilles, multicolored LED status array)
  const server = scene.make.graphics({ x: 0, y: 0, add: false });
  // Cabinet Outer Casing & Shadow
  server.fillStyle(0x0d0e15, 1); // Shadow border
  server.fillRect(0, 0, 64, 122);
  server.fillStyle(0x1a1d28, 1); // Main Frame
  server.fillRect(2, 2, 60, 118);
  server.lineStyle(2, 0x3a3f58, 1);
  server.strokeRect(2, 2, 60, 118);

  // Top Glass Header with AI Server Logo
  server.fillStyle(0x252a3a, 1);
  server.fillRect(6, 6, 52, 8);
  server.fillStyle(0x88c0d0, 1); // Glowing logo bar
  server.fillRect(12, 9, 40, 2);

  // 7 Server Blade Units
  for (let i = 0; i < 7; i++) {
    const y = 18 + i * 14;
    // Server unit chassis
    server.fillStyle(0x232734, 1);
    server.fillRect(6, y, 52, 11);
    server.fillStyle(0x32384a, 1); // Unit top highlight
    server.fillRect(6, y, 52, 1);
    // Ventilation Mesh Grille
    server.fillStyle(0x12141d, 1);
    server.fillRect(8, y + 2, 22, 7);
    for (let gx = 10; gx < 28; gx += 3) {
      server.fillStyle(0x32384a, 1);
      server.fillRect(gx, y + 3, 1, 5);
    }
    // Drive Bay Slits
    server.fillStyle(0x1a1d28, 1);
    server.fillRect(32, y + 2, 10, 7);
    server.fillRect(44, y + 2, 12, 7);

    // Multicolored Status LEDs
    server.fillStyle(0x2ecc71, 1); // Power Green
    server.fillRect(34, y + 4, 2, 2);
    server.fillStyle(0x3498db, 1); // Activity Blue
    server.fillRect(38, y + 4, 2, 2);
    server.fillStyle((i % 2 === 0) ? 0xf1c40f : 0x2ecc71, 1); // Network Yellow/Green
    server.fillRect(46, y + 4, 2, 2);
    server.fillStyle(0xe74c3c, (i === 3) ? 1 : 0.2); // Alert Red
    server.fillRect(50, y + 4, 2, 2);
  }
  server.generateTexture('server_rack', 64, 122);

  // 7. GPU AI Cluster Node (Supercomputer glass panel, liquid cooling tubes, pulsing AI core glow)
  const gpuCluster = scene.make.graphics({ x: 0, y: 0, add: false });
  // Supercomputer Main Frame
  gpuCluster.fillStyle(0x0f111a, 1);
  gpuCluster.fillRect(0, 0, 84, 104);
  gpuCluster.fillStyle(0x1b1e2e, 1);
  gpuCluster.fillRect(2, 2, 80, 100);
  gpuCluster.lineStyle(2, 0x00f2fe, 1); // Futuristic Neon Border
  gpuCluster.strokeRect(2, 2, 80, 100);

  // Internal Illuminated Chamber (Liquid Cooled GPU Core)
  gpuCluster.fillStyle(0x0a1526, 1);
  gpuCluster.fillRect(8, 12, 68, 80);
  gpuCluster.fillStyle(0x00f2fe, 0.25); // Glass glow
  gpuCluster.fillRect(10, 14, 64, 76);

  // Glowing GPU Fan Array (3 Fans)
  for (let fy = 20; fy <= 68; fy += 24) {
    gpuCluster.fillStyle(0x122238, 1); // Fan housing
    gpuCluster.fillRect(14, fy, 22, 20);
    gpuCluster.lineStyle(1, 0x00f2fe, 0.8);
    gpuCluster.strokeCircle(25, fy + 10, 8);
    gpuCluster.fillStyle(0x4facfe, 1); // Fan center hub glow
    gpuCluster.fillRect(24, fy + 9, 3, 3);
  }

  // Liquid Cooling Pipes with Cyan Fluid
  gpuCluster.fillStyle(0x00f2fe, 1); // Glowing pipe
  gpuCluster.fillRect(42, 22, 4, 56);
  gpuCluster.fillRect(42, 22, 26, 4);
  gpuCluster.fillRect(42, 74, 26, 4);
  gpuCluster.fillStyle(0x00c6ff, 1);
  gpuCluster.fillRect(64, 22, 4, 56);

  // AI Core Neural Processor Matrix
  gpuCluster.fillStyle(0x182848, 1);
  gpuCluster.fillRect(48, 34, 14, 34);
  gpuCluster.lineStyle(1, 0x00f2fe, 1);
  gpuCluster.strokeRect(48, 34, 14, 34);
  gpuCluster.fillStyle(0x00f2fe, 1); // Core center matrix
  gpuCluster.fillRect(52, 38, 6, 26);
  gpuCluster.generateTexture('gpu_cluster', 84, 104);

  // 8. Boardroom Presentation Screen (4K Wall display, business growth graphs, AI ROI metrics)
  const boardScreen = scene.make.graphics({ x: 0, y: 0, add: false });
  // Wall Mount Frame
  boardScreen.fillStyle(0x0f111a, 1); // Frame bezel
  boardScreen.fillRect(0, 0, 168, 96);
  boardScreen.fillStyle(0x1e222d, 1); // Inner Bezel
  boardScreen.fillRect(4, 4, 160, 88);
  boardScreen.fillStyle(0x0d131d, 1); // Glass Screen Display
  boardScreen.fillRect(8, 8, 152, 80);

  // Presentation Title Banner
  boardScreen.fillStyle(0x1a233a, 1);
  boardScreen.fillRect(12, 12, 144, 12);
  boardScreen.fillStyle(0x00d2d3, 1); // Header Title text line
  boardScreen.fillRect(16, 16, 70, 4);
  boardScreen.fillStyle(0xf39c12, 1); // Subtitle target
  boardScreen.fillRect(92, 16, 50, 4);

  // Chart 1: Bar Comparison (Before AI vs. With AI)
  boardScreen.fillStyle(0x17202a, 1); // Chart background box 1
  boardScreen.fillRect(12, 28, 68, 54);
  boardScreen.fillStyle(0x2c3e50, 1); // Grid lines
  boardScreen.fillRect(16, 34, 60, 1);
  boardScreen.fillRect(16, 46, 60, 1);
  boardScreen.fillRect(16, 58, 60, 1);

  boardScreen.fillStyle(0xe74c3c, 1); // Red Bar (Legacy Dev - Low)
  boardScreen.fillRect(22, 52, 12, 24);
  boardScreen.fillStyle(0xf1c40f, 1); // Yellow Bar (Mid)
  boardScreen.fillRect(38, 40, 12, 36);
  boardScreen.fillStyle(0x2ecc71, 1); // Green Bar (AI Copilot - High!)
  boardScreen.fillRect(54, 32, 12, 44);

  // Chart 2: Exponential Growth Trajectory & Metrics
  boardScreen.fillStyle(0x17202a, 1); // Chart background box 2
  boardScreen.fillRect(88, 28, 68, 54);
  // Upward Trajectory Curve (Green / Cyan)
  boardScreen.fillStyle(0x00f2fe, 1);
  boardScreen.fillRect(92, 70, 10, 3);
  boardScreen.fillRect(102, 66, 10, 3);
  boardScreen.fillRect(112, 58, 10, 3);
  boardScreen.fillRect(122, 48, 10, 3);
  boardScreen.fillRect(132, 36, 16, 3);

  boardScreen.fillStyle(0x2ecc71, 1); // Target Growth Flag
  boardScreen.fillRect(142, 31, 3, 8);
  boardScreen.fillRect(145, 31, 6, 4);
  boardScreen.generateTexture('board_screen', 168, 96);

  // 8b. Decorative Accessories (Plant, City Window, Wall Poster, Wall Clock, Ceiling Light)
  // Office Plant in Ceramic Pot
  const plant = scene.make.graphics({ x: 0, y: 0, add: false });
  // Ceramic Pot
  plant.fillStyle(0xd35400, 1);
  plant.fillRect(6, 32, 20, 16);
  plant.fillStyle(0xe67e22, 1);
  plant.fillRect(4, 30, 24, 4);
  // Foliage / Leaves
  plant.fillStyle(0x1e8449, 1); // Dark green backing
  plant.fillRect(2, 10, 28, 22);
  plant.fillStyle(0x27ae60, 1); // Mid green leaves
  plant.fillRect(4, 6, 24, 22);
  plant.fillStyle(0x2ecc71, 1); // Light leaf highlights
  plant.fillRect(8, 2, 16, 16);
  plant.generateTexture('office_plant', 32, 48);

  // Pixel City Skyline Window
  const windowG = scene.make.graphics({ x: 0, y: 0, add: false });
  // Outer Window Frame
  windowG.fillStyle(0x1a202c, 1);
  windowG.fillRect(0, 0, 100, 80);
  windowG.fillStyle(0x2d3748, 1);
  windowG.fillRect(4, 4, 92, 72);
  // Night Sky Gradient
  windowG.fillStyle(0x0f172a, 1);
  windowG.fillRect(6, 6, 88, 68);
  // Pixel Buildings Silhouette
  windowG.fillStyle(0x1e293b, 1);
  windowG.fillRect(10, 30, 20, 44);
  windowG.fillRect(34, 20, 24, 54);
  windowG.fillRect(62, 36, 18, 38);
  windowG.fillRect(82, 16, 12, 58);
  // Glowing Windows in Buildings
  windowG.fillStyle(0xfef08a, 0.9); // Gold windows
  windowG.fillRect(14, 36, 4, 4);
  windowG.fillRect(22, 44, 4, 4);
  windowG.fillRect(38, 26, 6, 4);
  windowG.fillRect(48, 34, 6, 4);
  windowG.fillRect(38, 48, 6, 4);
  windowG.fillRect(66, 42, 4, 4);
  windowG.fillRect(84, 22, 4, 4);
  windowG.fillRect(84, 36, 4, 4);
  // Window Pane Cross Dividers
  windowG.fillStyle(0x1a202c, 1);
  windowG.fillRect(48, 4, 4, 72);
  windowG.fillRect(4, 38, 92, 4);
  windowG.generateTexture('city_window', 100, 80);

  // Framed AI Wall Poster
  const poster = scene.make.graphics({ x: 0, y: 0, add: false });
  poster.fillStyle(0x1e293b, 1);
  poster.fillRect(0, 0, 36, 48);
  poster.fillStyle(0x38bdf8, 1); // Border line
  poster.strokeRect(2, 2, 32, 44);
  poster.fillStyle(0x0f172a, 1);
  poster.fillRect(4, 4, 28, 40);
  // AI Graphic (Brain / Circuit)
  poster.fillStyle(0x00f2fe, 1);
  poster.fillRect(12, 12, 12, 12);
  poster.fillRect(8, 28, 20, 2);
  poster.fillRect(14, 34, 8, 2);
  poster.generateTexture('wall_poster', 36, 48);

  // Wall Clock
  const clock = scene.make.graphics({ x: 0, y: 0, add: false });
  clock.fillStyle(0x334155, 1);
  clock.fillCircle(14, 14, 14);
  clock.fillStyle(0xf8fafc, 1);
  clock.fillCircle(14, 14, 11);
  clock.fillStyle(0x0f172a, 1); // Clock hands
  clock.fillRect(13, 7, 2, 8);
  clock.fillRect(14, 13, 6, 2);
  clock.generateTexture('wall_clock', 28, 28);

  // 9. Doorway / Partition Archway (Framed glass partition, chrome handle, frosted glass reflection)
  const door = scene.make.graphics({ x: 0, y: 0, add: false });
  // Steel Door Frame
  door.fillStyle(0x2d3748, 1);
  door.fillRect(0, 0, 44, 140);
  door.fillStyle(0x4a5568, 1); // Metallic highlight
  door.fillRect(2, 2, 40, 136);
  // Glass Panes
  door.fillStyle(0x1a202c, 1); // Recess frame
  door.fillRect(6, 6, 32, 128);
  door.fillStyle(0x4a5568, 0.4); // Tinted Frosted Glass
  door.fillRect(8, 8, 28, 124);
  // Diagonal Glass Reflection Streaks
  door.fillStyle(0xffffff, 0.25);
  door.fillRect(12, 20, 20, 2);
  door.fillRect(10, 24, 24, 2);
  door.fillRect(12, 80, 20, 2);
  door.fillRect(10, 84, 24, 2);
  // Chrome Handle
  door.fillStyle(0xe2e8f0, 1);
  door.fillRect(32, 68, 3, 16);
  door.fillRect(30, 70, 5, 2);
  door.fillRect(30, 80, 5, 2);
  door.generateTexture('doorway', 44, 140);

  // Door Security Lock Overlays (Red locked status & Green unlocked status)
  const doorLocked = scene.make.graphics({ x: 0, y: 0, add: false });
  doorLocked.fillStyle(0xbf616a, 0.9); // Red LED indicator box
  doorLocked.fillRect(0, 0, 36, 18);
  doorLocked.lineStyle(2, 0xd08770, 1);
  doorLocked.strokeRect(0, 0, 36, 18);
  doorLocked.fillStyle(0xffffff, 1);
  doorLocked.fillRect(14, 4, 8, 5); // Lock shackle
  doorLocked.fillRect(12, 8, 12, 6); // Lock body
  doorLocked.generateTexture('door_locked', 36, 18);

  const doorUnlocked = scene.make.graphics({ x: 0, y: 0, add: false });
  doorUnlocked.fillStyle(0xa3be8c, 0.9); // Green LED indicator box
  doorUnlocked.fillRect(0, 0, 36, 18);
  doorUnlocked.lineStyle(2, 0x8fbcbb, 1);
  doorUnlocked.strokeRect(0, 0, 36, 18);
  doorUnlocked.fillStyle(0xffffff, 1);
  doorUnlocked.fillRect(12, 8, 12, 6); // Open lock body
  doorUnlocked.fillRect(18, 3, 6, 5); // Open shackle
  doorUnlocked.generateTexture('door_unlocked', 36, 18);

  // Keycard Item Texture
  const keycardG = scene.make.graphics({ x: 0, y: 0, add: false });
  keycardG.fillStyle(0xebcb8b, 1); // Gold plastic security card
  keycardG.fillRect(0, 0, 24, 16);
  keycardG.fillStyle(0x2e3440, 1); // Magnetic stripe
  keycardG.fillRect(0, 3, 24, 4);
  keycardG.fillStyle(0x88c0d0, 1); // Embedded smart chip
  keycardG.fillRect(4, 9, 5, 4);
  keycardG.generateTexture('keycard', 24, 16);

  // 10. NPC Sprites (Dev, Engineer, CEO)
  // Dev NPC (Orange hoodie, headphones, glasses, jeans, sneakers)
  const devNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  // Head & Hair
  devNpc.fillStyle(0xffdbac, 1); // Skin
  devNpc.fillRect(10, 4, 12, 11);
  devNpc.fillStyle(0x1a1a24, 1); // Eye
  devNpc.fillRect(18, 7, 2, 3);
  devNpc.fillStyle(0x34495e, 1); // Glasses frame
  devNpc.fillRect(16, 6, 5, 4);
  devNpc.fillStyle(0x88c0d0, 0.4); // Lens glare
  devNpc.fillRect(17, 7, 3, 2);
  devNpc.fillStyle(0xf39c12, 1); // Blonde hair
  devNpc.fillRect(9, 1, 14, 5);
  devNpc.fillRect(8, 3, 4, 6);
  // Overhead Headphones
  devNpc.fillStyle(0x2c3e50, 1); // Band
  devNpc.fillRect(11, 0, 10, 2);
  devNpc.fillRect(8, 5, 3, 6); // Ear cup
  devNpc.fillStyle(0x00d2d3, 1); // LED indicator
  devNpc.fillRect(8, 8, 1, 2);
  // Hoodie Torso
  devNpc.fillStyle(0xd35400, 1); // Amber hoodie
  devNpc.fillRect(9, 15, 14, 19);
  devNpc.fillStyle(0xe67e22, 1); // Hoodie highlight
  devNpc.fillRect(9, 15, 3, 10);
  devNpc.fillStyle(0xa04000, 1); // Hoodie shadow
  devNpc.fillRect(20, 16, 3, 18);
  devNpc.fillStyle(0xffffff, 1); // Drawstrings
  devNpc.fillRect(14, 17, 1, 5);
  devNpc.fillRect(17, 17, 1, 5);
  devNpc.fillStyle(0xa04000, 1); // Pouch pocket
  devNpc.fillRect(12, 28, 8, 5);
  // Jeans & Sneakers
  devNpc.fillStyle(0x2980b9, 1); // Blue jeans
  devNpc.fillRect(10, 34, 12, 10);
  devNpc.fillStyle(0x1a5276, 1);
  devNpc.fillRect(15, 34, 2, 10); // Inseam gap
  devNpc.fillStyle(0xecf0f1, 1); // White sneakers
  devNpc.fillRect(9, 44, 6, 4);
  devNpc.fillRect(17, 44, 6, 4);
  devNpc.fillStyle(0x2c3e50, 1); // Sole
  devNpc.fillRect(8, 47, 8, 1);
  devNpc.fillRect(16, 47, 8, 1);
  devNpc.generateTexture('npc_dev', 32, 48);

  // Server Engineer NPC (Teal jumpsuit, safety goggles, lanyard ID badge)
  const engNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  // Head & Hair
  engNpc.fillStyle(0x8d5524, 1); // Brown skin tone
  engNpc.fillRect(10, 4, 12, 11);
  engNpc.fillStyle(0x1a1a24, 1); // Eye
  engNpc.fillRect(18, 7, 2, 3);
  engNpc.fillStyle(0x1c1c1c, 1); // Black hair
  engNpc.fillRect(9, 1, 14, 4);
  // Safety Goggles on forehead
  engNpc.fillStyle(0x34495e, 1); // Frame
  engNpc.fillRect(10, 2, 12, 3);
  engNpc.fillStyle(0x3498db, 0.8); // Blue visor lens
  engNpc.fillRect(12, 2, 8, 2);
  // Jumpsuit Torso
  engNpc.fillStyle(0x16a085, 1); // Teal
  engNpc.fillRect(9, 15, 14, 19);
  engNpc.fillStyle(0x1abc9c, 1); // Highlight
  engNpc.fillRect(9, 15, 3, 10);
  engNpc.fillStyle(0x117864, 1); // Shadow
  engNpc.fillRect(20, 16, 3, 18);
  // Lanyard with ID badge
  engNpc.fillStyle(0xe74c3c, 1); // Red strap
  engNpc.fillRect(14, 15, 4, 8);
  engNpc.fillStyle(0xffffff, 1); // White ID card
  engNpc.fillRect(14, 22, 5, 6);
  engNpc.fillStyle(0x2980b9, 1); // Photo area
  engNpc.fillRect(15, 23, 3, 2);
  // Belt & Utility Pouch
  engNpc.fillStyle(0x34495e, 1);
  engNpc.fillRect(9, 32, 14, 3);
  engNpc.fillStyle(0x7f8c8d, 1); // Pouch
  engNpc.fillRect(10, 31, 4, 4);
  // Pants & Heavy Work Boots
  engNpc.fillStyle(0x117864, 1);
  engNpc.fillRect(10, 35, 12, 9);
  engNpc.fillStyle(0x5d4037, 1); // Leather boots
  engNpc.fillRect(9, 44, 6, 4);
  engNpc.fillRect(17, 44, 6, 4);
  engNpc.fillStyle(0x3e2723, 1);
  engNpc.fillRect(8, 47, 8, 1);
  engNpc.fillRect(16, 47, 8, 1);
  engNpc.generateTexture('npc_eng', 32, 48);

  // CEO NPC (Luxury purple pinstripe suit, gold watch, grey hair, elegant stance)
  const ceoNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  // Head & Hair
  ceoNpc.fillStyle(0xffdbac, 1); // Skin
  ceoNpc.fillRect(10, 4, 12, 11);
  ceoNpc.fillStyle(0x1a1a24, 1); // Eye
  ceoNpc.fillRect(18, 7, 2, 3);
  ceoNpc.fillStyle(0xbdc3c7, 1); // Elegant silver/grey hair
  ceoNpc.fillRect(9, 1, 14, 4);
  ceoNpc.fillRect(8, 3, 4, 7);
  ceoNpc.fillStyle(0xecf0f1, 1); // Hair highlight
  ceoNpc.fillRect(12, 1, 8, 2);
  // Suit & Tie
  ceoNpc.fillStyle(0x4a235a, 1); // Royal Purple suit jacket
  ceoNpc.fillRect(9, 15, 14, 19);
  ceoNpc.fillStyle(0x5b2c6f, 1);
  ceoNpc.fillRect(9, 15, 3, 10);
  ceoNpc.fillStyle(0x341f3d, 1); // Lapel/Shadow
  ceoNpc.fillRect(20, 16, 3, 18);
  ceoNpc.fillStyle(0xffffff, 1); // White shirt
  ceoNpc.fillRect(14, 15, 4, 8);
  ceoNpc.fillStyle(0xec407a, 1); // Magenta silk tie
  ceoNpc.fillRect(15, 17, 2, 7);
  ceoNpc.fillStyle(0xffffff, 1); // Pocket square
  ceoNpc.fillRect(10, 20, 2, 2);
  // Gold Wrist Watch
  ceoNpc.fillStyle(0xf1c40f, 1);
  ceoNpc.fillRect(7, 28, 3, 3);
  // Trousers & Oxfords
  ceoNpc.fillStyle(0x341f3d, 1);
  ceoNpc.fillRect(10, 34, 12, 10);
  ceoNpc.fillStyle(0x1a0a21, 1);
  ceoNpc.fillRect(15, 34, 2, 10);
  ceoNpc.fillStyle(0x0a0a0d, 1); // Polished shoes
  ceoNpc.fillRect(9, 44, 6, 4);
  ceoNpc.fillRect(17, 44, 6, 4);
  ceoNpc.fillStyle(0x555566, 1); // Polish shine
  ceoNpc.fillRect(10, 44, 3, 1);
  ceoNpc.fillRect(18, 44, 3, 1);
  ceoNpc.generateTexture('npc_ceo', 32, 48);
}
