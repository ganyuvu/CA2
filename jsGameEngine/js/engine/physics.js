// Import the required modules and classes.
import Platform from '../game/platform.js';
import Component from './component.js';
import Renderer from './renderer.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 8 }) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.gravity = gravity; // Initialize the gravity.
  }

  // The update method handles how the component's state changes over time.
  update(deltaTime) {
    // Update velocity based on acceleration and gravity.
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;

    //Copilot helped me with the code below

    const platforms = this.gameObject.game.gameObjects.filter((obj) => obj instanceof Platform); // Get all platforms in the game

    this.IsGrounded = false;
    
    // Check if the game object is colliding with any of the platforms.
    for(let i=0; i<Math.abs(this.velocity.y); i++)
    {
      this.gameObject.y += Math.sign(this.velocity.y); // Move the game object by 1 pixel in the y direction.
      for(const obj of platforms)
      {
        if(obj.getComponent(Physics).isColliding(this)) // If the game object is colliding with a platform
        {
          // Move the game object back to its previous position and set its vertical velocity to 0.
          if(this.velocity.y<0)
          {
            this.gameObject.y += 1;
            this.velocity.y = 0;
            this.velocity.y += 1;
          }
          else if(this.velocity.y>=0)
          {
            this.gameObject.y -= 1;
            this.IsGrounded = true;
            this.velocity.y = 0;
          }
        }
      }
    }

    // Check if the game object is colliding with any of the platforms.
    for(let i=0; i<Math.abs(this.velocity.x); i++){ // Move the game object by 1 pixel in the x direction.
      this.gameObject.x+=Math.sign(this.velocity.x);
      // Check if the game object is colliding with any of the platforms.
      for(const obj of platforms){
           if(obj.getComponent(Physics).isColliding(this)){
            this.gameObject.x-=Math.sign(this.velocity.x);
            this.velocity.x = 0;
           }
        }
    }
  }

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    // Get the Renderer component of the game object to get its width and height.
    const renderer = this.gameObject.getComponent(Renderer);
    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = this.gameObject.x;
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + renderer.height;

    // Return the bounding box.
    return [left, right, top, bottom];
  }
}

// The Physics class is then exported as the default export of this module.
export default Physics;
