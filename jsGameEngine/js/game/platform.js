import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Platform extends GameObject {
  constructor(x, y, width, height, color = 'black', isStartingPlatform = false, isHittingFloor = false) {
    super(x, y);

    // The Renderer component is responsible for rendering the platform on the canvas
    this.addComponent(new Renderer(color, width, height));
    
    // Add a Physics component to this platform, with initial velocity, acceleration, and forces set to zero.
    // Since platforms don't move, these values will remain zero throughout the game
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    
    // Set the tag property to 'platform'. This can be used to identify platforms later in the game logic
    this.tag = 'platform'; 

    this.isStartingPlatform = isStartingPlatform;
    this.isHittingFloor = isHittingFloor;
  }
}

// Export the Platform class as the default export of this module
export default Platform;
