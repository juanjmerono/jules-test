export function createGameTextures(scene) {
  // 1. CTO Player Texture (Side view pixel character)
  const playerGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
  // Body (Suit & tie)
  playerGraphics.fillStyle(0x2e3440, 1); // Dark suit jacket
  playerGraphics.fillRect(8, 12, 16, 24);
  playerGraphics.fillStyle(0xd8dee9, 1); // Shirt
  playerGraphics.fillRect(13, 12, 6, 12);
  playerGraphics.fillStyle(0xbf616a, 1); // Red Tie
  playerGraphics.fillRect(15, 14, 2, 8);
  // Head & Hair
  playerGraphics.fillStyle(0xffdbac, 1); // Skin tone
  playerGraphics.fillRect(8, 2, 16, 10);
  playerGraphics.fillStyle(0x4c566a, 1); // Hair
  playerGraphics.fillRect(8, 0, 16, 4);
  // Pants & Shoes
  playerGraphics.fillStyle(0x3b4252, 1); // Pants
  playerGraphics.fillRect(8, 36, 16, 8);
  playerGraphics.fillStyle(0x1a1c23, 1); // Shoes
  playerGraphics.fillRect(6, 44, 8, 4);
  playerGraphics.fillRect(18, 44, 8, 4);
  playerGraphics.generateTexture('player', 32, 48);

  // 2. CTO Office Desk & Laptop
  const ctoDesk = scene.make.graphics({ x: 0, y: 0, add: false });
  ctoDesk.fillStyle(0x8fbcbb, 1); // Sleek desk top
  ctoDesk.fillRect(0, 20, 90, 8);
  ctoDesk.fillStyle(0x4c566a, 1); // Metallic legs
  ctoDesk.fillRect(8, 28, 6, 24);
  ctoDesk.fillRect(76, 28, 6, 24);
  // Laptop
  ctoDesk.fillStyle(0xd8dee9, 1);
  ctoDesk.fillRect(30, 10, 24, 10);
  ctoDesk.fillStyle(0x88c0d0, 1); // Screen glow
  ctoDesk.fillRect(32, 12, 20, 7);
  ctoDesk.generateTexture('cto_desk', 90, 52);

  // 3. AI Whiteboard
  const whiteboard = scene.make.graphics({ x: 0, y: 0, add: false });
  whiteboard.fillStyle(0xe5e9f0, 1);
  whiteboard.fillRect(0, 0, 100, 60);
  whiteboard.lineStyle(3, 0x4c566a, 1);
  whiteboard.strokeRect(0, 0, 100, 60);
  // Whiteboard drawing / diagrams
  whiteboard.fillStyle(0x5e81ac, 1);
  whiteboard.fillRect(10, 10, 25, 15);
  whiteboard.fillRect(60, 10, 25, 15);
  whiteboard.fillRect(35, 35, 30, 18);
  whiteboard.generateTexture('whiteboard', 100, 60);

  // 4. Developer Workstation
  const devStation = scene.make.graphics({ x: 0, y: 0, add: false });
  devStation.fillStyle(0x434c5e, 1);
  devStation.fillRect(0, 24, 110, 8);
  devStation.fillStyle(0x2e3440, 1);
  devStation.fillRect(10, 32, 8, 20);
  devStation.fillRect(92, 32, 8, 20);
  // Dual monitors
  devStation.fillStyle(0x1e222a, 1);
  devStation.fillRect(10, 4, 38, 20);
  devStation.fillRect(52, 4, 38, 20);
  devStation.fillStyle(0xa3be8c, 1); // Code glow on screens
  devStation.fillRect(12, 6, 34, 16);
  devStation.fillStyle(0xb48ead, 1);
  devStation.fillRect(54, 6, 34, 16);
  devStation.generateTexture('dev_station', 110, 52);

  // 5. Coffee Machine
  const coffee = scene.make.graphics({ x: 0, y: 0, add: false });
  coffee.fillStyle(0xd8dee9, 1);
  coffee.fillRect(0, 0, 30, 45);
  coffee.fillStyle(0xbf616a, 1); // Accent strip
  coffee.fillRect(0, 10, 30, 5);
  coffee.fillStyle(0xebcb8b, 1); // Pot area
  coffee.fillRect(6, 22, 18, 15);
  coffee.generateTexture('coffee_machine', 30, 45);

  // 6. Server Rack
  const server = scene.make.graphics({ x: 0, y: 0, add: false });
  server.fillStyle(0x1a1c23, 1);
  server.fillRect(0, 0, 60, 120);
  server.lineStyle(2, 0x3b4252, 1);
  server.strokeRect(0, 0, 60, 120);
  // Rack slots & LED lights
  for (let y = 8; y < 110; y += 14) {
    server.fillStyle(0x2e3440, 1);
    server.fillRect(4, y, 52, 10);
    // LEDs
    server.fillStyle(0xa3be8c, 1); // Green LED
    server.fillRect(8, y + 3, 4, 4);
    server.fillStyle(0xebcb8b, 1); // Yellow LED
    server.fillRect(16, y + 3, 4, 4);
    server.fillStyle(0x81a1c1, 1); // Blue LED
    server.fillRect(24, y + 3, 4, 4);
  }
  server.generateTexture('server_rack', 60, 120);

  // 7. GPU AI Cluster Node
  const gpuCluster = scene.make.graphics({ x: 0, y: 0, add: false });
  gpuCluster.fillStyle(0x2e3440, 1);
  gpuCluster.fillRect(0, 0, 80, 100);
  gpuCluster.fillStyle(0x88c0d0, 1); // Neon AI core glow
  gpuCluster.fillRect(15, 20, 50, 60);
  gpuCluster.lineStyle(2, 0x88c0d0, 1);
  gpuCluster.strokeRect(5, 5, 70, 90);
  gpuCluster.generateTexture('gpu_cluster', 80, 100);

  // 8. Boardroom Presentation Screen
  const boardScreen = scene.make.graphics({ x: 0, y: 0, add: false });
  boardScreen.fillStyle(0x1e222a, 1);
  boardScreen.fillRect(0, 0, 160, 90);
  boardScreen.lineStyle(4, 0xd8dee9, 1);
  boardScreen.strokeRect(0, 0, 160, 90);
  // Chart graphics on board screen
  boardScreen.fillStyle(0xbf616a, 1); // Red downward trend line / bar
  boardScreen.fillRect(20, 50, 20, 30);
  boardScreen.fillStyle(0xebcb8b, 1);
  boardScreen.fillRect(50, 40, 20, 40);
  boardScreen.fillStyle(0xa3be8c, 1); // Green target bar
  boardScreen.fillRect(80, 15, 20, 65);
  boardScreen.generateTexture('board_screen', 160, 90);

  // 9. Doorway / Partition archway
  const door = scene.make.graphics({ x: 0, y: 0, add: false });
  door.fillStyle(0x3b4252, 1);
  door.fillRect(0, 0, 40, 140);
  door.fillStyle(0x81a1c1, 0.4);
  door.fillRect(6, 10, 28, 120);
  door.generateTexture('doorway', 40, 140);

  // 10. NPC Sprites (Dev, Engineer, CEO)
  // Dev NPC
  const devNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  devNpc.fillStyle(0xd08770, 1); // Sweater
  devNpc.fillRect(8, 12, 16, 24);
  devNpc.fillStyle(0xffdbac, 1);
  devNpc.fillRect(8, 2, 16, 10);
  devNpc.fillStyle(0xebcb8b, 1); // Blonde Hair
  devNpc.fillRect(8, 0, 16, 5);
  devNpc.fillStyle(0x4c566a, 1); // Jeans
  devNpc.fillRect(8, 36, 16, 12);
  devNpc.generateTexture('npc_dev', 32, 48);

  // Server Engineer NPC
  const engNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  engNpc.fillStyle(0xa3be8c, 1); // Lab coat / jumpsuit
  engNpc.fillRect(8, 12, 16, 24);
  engNpc.fillStyle(0xc0a080, 1);
  engNpc.fillRect(8, 2, 16, 10);
  engNpc.fillStyle(0x2e3440, 1); // Dark hair
  engNpc.fillRect(8, 0, 16, 4);
  engNpc.fillStyle(0x3b4252, 1);
  engNpc.fillRect(8, 36, 16, 12);
  engNpc.generateTexture('npc_eng', 32, 48);

  // CEO NPC
  const ceoNpc = scene.make.graphics({ x: 0, y: 0, add: false });
  ceoNpc.fillStyle(0xb48ead, 1); // Luxury suit
  ceoNpc.fillRect(8, 12, 16, 24);
  ceoNpc.fillStyle(0xffdbac, 1);
  ceoNpc.fillRect(8, 2, 16, 10);
  ceoNpc.fillStyle(0xd8dee9, 1); // Grey Hair
  ceoNpc.fillRect(8, 0, 16, 4);
  ceoNpc.fillStyle(0x2e3440, 1);
  ceoNpc.fillRect(8, 36, 16, 12);
  ceoNpc.generateTexture('npc_ceo', 32, 48);
}
