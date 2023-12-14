import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

class Level extends Game {
  constructor(canvasId) {
   
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    const platforms = [
      new Platform(this.canvas.width / 2 - platformWidth - gap * 3.7, this.canvas.height / 1.65, platformWidth * 1.5, 25), // Longer platform
      new Platform(this.canvas.width / 2 - platformWidth - gap * 6, this.canvas.height / 2 - gap * 2, platformWidth, 25, 'red'), // Wider gap, lower position
      new Platform(this.canvas.width / 2 + gap * 2, this.canvas.height / 1.59, platformWidth * 4, 25,'green'), // Even longer platform
      new Platform(this.canvas.width / 2 + gap * 4, this.canvas.height / 1.78 - gap, platformWidth, 25, 'darkred'), // Wider gap
      new Platform(this.canvas.width / 2 + gap * 5, this.canvas.height / 3 - gap, platformWidth, 25, 'darkred'), // Wider gap
      new Platform(this.canvas.width / 2 + gap * 10, this.canvas.height / 4 - gap, platformWidth, 25, 'darkred'), // Wider gap
      new Platform(this.canvas.width / 2 - platformWidth / 2, this.canvas.height / 2 + gap * 2, platformWidth, 20, 'darkcyan'), // Lower position
      new Platform(this.canvas.width / 2 - platformWidth - gap * 8, this.canvas.height / 2 - gap * 3, platformWidth * 1.5, 25,'pruple'), // Wider gap, longer platform
      new Platform(this.canvas.width / 2 + gap * 14, this.canvas.height / 2 - gap * 2, platformWidth, 25), // Wider gap
      new Platform(this.canvas.width / 2 - platformWidth - gap * 10, this.canvas.height / 2 - gap * 4, platformWidth * 2, 25), // Wider gap, longer platform
      new Platform(this.canvas.width / 2 + gap * 19, this.canvas.height / 2 - gap * 3, platformWidth, 25), // Wider gap
      new Platform(this.canvas.width / 2 - platformWidth - gap * 12, this.canvas.height / 2 - gap * 5, platformWidth * 1.5, 25), // Wider gap, lower position, longer platform
      new Platform(this.canvas.width / 2 + gap * 24, this.canvas.height / 2 - gap * 4, platformWidth, 25), // Wider gap
    ];

    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(this.canvas.width / 2 - platformWidth - gap * 3.7, this.canvas.height / 1.65, platformWidth * 1.5, 25));
    this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
