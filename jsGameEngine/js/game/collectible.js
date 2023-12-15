import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Collectible extends GameObject {
  constructor(x, y, width, height, color = 'gold') {
    super(x, y);
    this.addComponent(new Renderer(color, width, height));
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

    // Set the 'tag' property of this collectible. The tag is used to identify the type of GameObject
    // (useful when checking collisions, for example)
    this.tag = 'collectible';

    // Set the 'value' property of this collectible. This could be used to score points when the collectible is collected.
    this.value = 1;
  }
}

// Export the Collectible class as the default export of this module
export default Collectible;
