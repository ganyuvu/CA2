import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

class Level extends Game {
  constructor(canvasId) {
   
    super(canvasId);

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);

    // Set the game's camera target to the player
    this.camera.target = player;

    const platforms = [
      //Starting platform
      new Platform(this.canvas.width / 2 - platformWidth / 2, this.canvas.height / 2 + gap * 2, platformWidth, 20, 'darkcyan', true),

      //platforms on the left
      new Platform(this.canvas.width / 2 - platformWidth / 2, this.canvas.height / 2 + gap * 2, platformWidth, 20, 'darkcyan'),
      new Platform(this.canvas.width / 2 + gap * 2, this.canvas.height / 1.59, platformWidth * 3, 25), // longer platform
      new Platform(this.canvas.width / 2 + gap * 4, this.canvas.height / 1.78 - gap, platformWidth, 25), // Wider gap
      new Platform(this.canvas.width / 2 + gap * 7, this.canvas.height / 2.8 - gap, platformWidth, 25), 
      new Platform(this.canvas.width / 2 + gap * 12, this.canvas.height / 4 - gap, platformWidth, 25), 
      new Platform(this.canvas.width / 2 + gap * 14, this.canvas.height / 2 - gap * 0.3, platformWidth *1, 25), 
      new Platform(this.canvas.width / 2 + gap * 16, this.canvas.height / 2 - gap * -2.3, platformWidth, 25), 
      new Platform(this.canvas.width / 2 + gap * 13, this.canvas.height / 2 - gap * -1, platformWidth * 0.5, 25), 
      new Platform(this.canvas.width / 2 + gap * 20, this.canvas.height / 2 - gap * -3.3, platformWidth * 0.5, 25),
       
     
      //platforms on the right
      new Platform(this.canvas.width / 2 - platformWidth - gap * 8, this.canvas.height / 2 - gap * 3, platformWidth * 1.5, 25,'pruple'), // Wider gap, longer platform
      new Platform(this.canvas.width / 2 - platformWidth - gap * 6, this.canvas.height / 2 - gap * 2, platformWidth, 25, 'red'), // Wider gap, lower position
      new Platform(this.canvas.width / 2 - platformWidth - gap * 3.7, this.canvas.height / 1.65, platformWidth * 1.5, 25), // Longer platform
      new Platform(this.canvas.width / 2 - platformWidth - gap * 10, this.canvas.height / 2 - gap * 4, platformWidth * 2, 25), // Wider gap, longer platform
      new Platform(this.canvas.width / 2 + gap * 19, this.canvas.height / 2 - gap * 3, platformWidth, 25), // Wider gap
      new Platform(this.canvas.width / 2 - platformWidth - gap * 12, this.canvas.height / 2 - gap * 5, platformWidth * 1.5, 25), // Wider gap, lower position, longer platform
      new Platform(this.canvas.width / 2 + gap * 24, this.canvas.height / 2 - gap * 4, platformWidth, 25), // Wider gap
    ];

    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Creating an infinite platform and add it to the game
    this.infinitePlatform = new Platform(this.canvas.width / 10, this.canvas.height / 2 - gap * -5, platformWidth * 2000, 25);
    this.addGameObject(this.infinitePlatform);

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(this.canvas.width / 2 - platformWidth - gap * 3.7, this.canvas.height / 1.65, platformWidth * 1.5, 25));
    this.addGameObject(new Enemy(this.canvas.width / 2 + gap * 2, this.canvas.height / 1.59, platformWidth * 4, 25));
    this.addGameObject(new Enemy(this.canvas.width / 2 + gap * 14, this.canvas.height / 2 - gap * 0.8, platformWidth, 25));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(450, 500 - 100, 20, 20));
    this.addGameObject(new Collectible(450, 500 - 100, 20, 20));
    this.addGameObject(new Collectible(450, 500 - 100, 20, 20));
    this.addGameObject(new Collectible(450, 500 - 100, 20, 20));
  }

  update(deltaTime) {
    // Move the infinite platform to the left
    this.infinitePlatform.x -= 5;

    // If the infinite platform has moved off the screen, reset its position to the right side of the screen
    if (this.infinitePlatform.x + this.infinitePlatform.width < 0) {
      this.infinitePlatform.x = this.canvas.width;
    }

    // Call the superclass's update method to update the rest of the game objects
    super.update(deltaTime);
  }
  
}

// Export the Level class as the default export of this module
export default Level;
