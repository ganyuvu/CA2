import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/animator.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';
import Player from './player.js';
import Platform from './platform.js';

class Enemy extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.addComponent(new Renderer('green', 50, 50));
    this.addComponent(new Physics({ x: 50, y: 0 }, { x: 0, y: 0 }));

    // Define the animations for the enemy
    const animations = {
      'run': {
        spriteSheet: Images.runEnemy, // The sprite sheet for the run animation
        frameCount: 3, // The number of frames in the run animation
        frameDuration: 0.1 // The duration of each frame in seconds
      },
    };

    this.addComponent(new Animator(animations, 'run')); // The initial state is 'run'
    this.movementDistance = 0;
    this.movementLimit = 10;
    this.movingRight = true;
    this.eSpeed = 6;//Enemy speed
  }

  update(deltaTime) {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);
    // Get the Animator component of this enemy
    const animator = this.getComponent(Animator);

    // Check if the enemy is moving to the right
    if (this.movingRight) {
      // If it hasn't reached its movement limit, make it move right
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = this.eSpeed;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = 1;
      } else {
        // If it reached the limit, make it move left
        this.movingRight = false;
        this.movementDistance = 0;
      }
    } else {
      // If it hasn't reached its movement limit, make it move left
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = -this.eSpeed;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = -1;
      } else {
        // If it reached the limit, make it move right
        this.movingRight = true;
        this.movementDistance = 0;
      }

      if (this.movingRight || !this.movingRight) {
        animator.setState('run');
      }
    }

    // Check if the enemy is colliding with the player
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    if (physics.isColliding(player.getComponent(Physics))) {
      player.collidedWithEnemy();
    }

    // Check if the enemy is colliding with any platforms
    const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
    this.isOnPlatform = false;
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        // If it is, stop its vertical movement and position it on top of the platform
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y - this.getComponent(Renderer).height;
        this.isOnPlatform = true;
      }
    }

    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }
}

// Export the Enemy class as the default export of this module
export default Enemy;
