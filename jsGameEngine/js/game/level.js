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
    //const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    const player = new Player(720, 320, 200, 20);
    this.addGameObject(player);

    // Set the game's camera target to the player
    this.camera.target = player;

    const platforms = [
      new Platform(5000, -6000, 2000, 10000),//right wall
      new Platform(-4000, -6000, 2000, 10000),//left wall
      new Platform(-2000, 850, 7000, 1000,'black',false, true),//floor

      //Starting platform
      new Platform(640, 540, 200, 20, 'darkcyan', true, false),
      //platforms on the left
      new Platform(940, 430, 600, 25),
      new Platform(1150, 284, 200, 25),
      new Platform(1445, 139, 200, 25),
      new Platform(1945, 70, 200, 25),
      new Platform(2445, 35, 100, 25),
      new Platform(2685, -60, 60, 25),
      new Platform(2340, 200, 60, 25), 
      new Platform(2143, 330, 200, 25), 
      new Platform(3145, -60, 200, 25), 
      new Platform(3445, -190, 100, 25),
      new Platform(3510, -340, 100, 25),
      new Platform(3445, -480, 100, 25),
      new Platform(3515, -630, 100, 25),
      new Platform(3945, -660, 300, 25), 
      new Platform(2350, 570, 200, 25), 
      new Platform(2040, 440, 100, 25), 
      new Platform(2740, 670, 100, 25),
       
     
      //platforms on the right
      new Platform(200, 400, 200, 25),
      new Platform(-10, 250, 60, 25),
      new Platform(-400, 150, 140, 25),
      new Platform(-800, 60, 50, 25),
      new Platform(-1000, 210, 50, 25),
      new Platform(-1330, 330, 40, 25),
      new Platform(-1490, 470, 60, 25),
      new Platform(-1540, 530, 60, 25),
      new Platform(-2000, 600, 130, 25),
      new Platform(-1470, -50, 370, 25),
      new Platform(-1390, -190, 200, 25),
      new Platform(-1320, -320, 60, 25),
      
  
    ];

    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(940, 430, 600, 25));
    this.addGameObject(new Enemy(1300, 430, 600, 25));
    this.addGameObject(new Enemy(2143, 330, 200, 25));
    this.addGameObject(new Enemy(-1320, -50, 370, 25));
    this.addGameObject(new Enemy(-1390, -190, 200, 25));
    this.addGameObject(new Enemy(4055, -660, 300, 25));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(2785, 640, 20, 20));
    this.addGameObject(new Collectible(4100, -690, 20, 20));
    this.addGameObject(new Collectible(-1300, -350, 20, 20));
    this.addGameObject(new Collectible(-1980, 560, 20, 20));
  }

  
}

// Export the Level class as the default export of this module
export default Level;
