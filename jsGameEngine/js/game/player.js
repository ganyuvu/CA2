// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Animator from '../engine/animator.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import { AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

class Player extends GameObject {
  constructor(x, y) {
    super(x, y); 
    this.renderer = new Renderer('blue', 45, 45); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input

    //Copilot helped me with animation
    // Defines the animations for the player
    const animations = {
      'idle': {
        spriteSheet: Images.idlePlayer, 
        frameCount: 2,
        frameDuration: 0.8
      },
      'run': {
        spriteSheet: Images.runPlayer, 
        frameCount: 4,
        frameDuration: 0.2
      }
    };

    this.animator = new Animator(animations, 'idle'); // Add animator

    this.addComponent(this.animator);

    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 6;
    this.jumpTime = 0.1;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.pSpeed = 5;//Player speed
    this.countdown = 180;
    this.stopGame= false; //this is for pausing the game
    this.jumpingSound = AudioFiles.jump;
    this.collectingSound = AudioFiles.collect;
    this.winningSound = AudioFiles.win;
    this.losingSound = AudioFiles.lose;
  }

  update(deltaTime) {
    if(this.stopGame == false)
    {
      this.countdown -= deltaTime;
      const physics = this.getComponent(Physics); // Get physics component
      const win = physics.Win;//Win variable
      const input = this.getComponent(Input); // Get input component

      //copilot helped here
      // Creating a win screen - connected to css file
      let winScreen = document.createElement('div');
        winScreen.id = 'win-Screen';
        winScreen.style.display = 'none';
        winScreen.innerHTML = '<h1>YOU WON!</h1><button onclick="location.reload()">Play Again</button>';
        document.body.appendChild(winScreen);

      // Creating a death screen - connected to css file
      let deathScreen = document.createElement('div');
        deathScreen.id = 'death-Screen';
        deathScreen.style.display = 'none';
        deathScreen.innerHTML = '<h1>GAME OVER!</h1><button onclick="location.reload()">Play Again</button>';
        document.body.appendChild(deathScreen);

      // Update the Animator - copilot helped here
      if (this.animator) {
        this.animator.update(deltaTime);
        const frame = this.animator.getCurrentFrame();
        this.renderer.sourceX = frame.x;
        this.renderer.sourceY = frame.y;
        this.renderer.sourceWidth = frame.width;
        this.renderer.sourceHeight = frame.height;
      }

      this.handleGamepadInput(input);
      
      // Handle player movement
      if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
        physics.velocity.x = this.pSpeed;
        this.direction = 1;
        this.animator.setState('run');
      } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
        physics.velocity.x = -this.pSpeed;
        this.direction = -1;
        this.animator.setState('run');
      } else if (!this.isGamepadMovement) {
        physics.velocity.x = 0;
        this.animator.setState('idle');
      }

      // Handle player jumping
      if (!this.isGamepadJump && input.isKeyDown('ArrowUp')) {
        this.startJump();
        this.jumpingSound.play();
      }

      if (this.isJumping) {
        this.updateJump(deltaTime);
      }

      // Handle collisions with collectibles
      const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible); 
      for (const collectible of collectibles) {
        if (physics.isColliding(collectible.getComponent(Physics))) {
          this.collect(collectible);
          this.collectingSound.play();
          this.game.removeGameObject(collectible);
        }
      }
    
      // Handle collisions with enemies
      const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
      for (const enemy of enemies) {
        if (physics.isColliding(enemy.getComponent(Physics))) {
          this.collidedWithEnemy();
        }
      }
      // If the player has 4 points and is on the starting platform, display the win screen
      if (this.score >= 4 && win == true) {
        document.getElementById('win-Screen').style.display = 'block';
        this.winningSound.play();
        this.stopGame = true;
      }

      // If the player has no lives left or the countdown reaches 0, display the death screen
      if(this.lives == 0 || this.countdown <= 0){
        document.getElementById('death-Screen').style.display = 'block';
        this.losingSound.play();
        this.stopGame = true;
      }

      super.update(deltaTime);
  }
}

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0)) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.getComponent(Physics).IsGrounded) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
