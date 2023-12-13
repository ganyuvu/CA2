//used copilot for this
import Component from './component.js';
import Renderer from './renderer.js'; 

class Animator extends Component {
  constructor(animations, initialState) {
    super();
    this.animations = animations; // The animations that this animator can play
    this.initialState = initialState; // The initial animation state
    this.currentState = initialState; // The current animation state e.g idle/run
    this.currentFrame = 0; // The current frame of the current animation
    this.elapsedTime = 0; // The amount of time that has passed since the last frame change
  }

  // Sets the current animation state
  setState(state) {
    if (this.animations.hasOwnProperty(state)) {
      this.currentState = state;
      this.currentFrame = 0;
      this.elapsedTime = 0;
    } else {
      console.error(`Invalid state: ${state}`);
    }
  }

  getCurrentFrame() {
    const animation = this.animations[this.currentState];
    const frameWidth = animation.spriteSheet.width / animation.frameCount;
    const frameHeight = animation.spriteSheet.height;
  
    return {
      x: this.currentFrame * frameWidth,
      y: 0,
      width: frameWidth,
      height: frameHeight
    };
  }

  // The update method is called once per game frame and is responsible for updating the state of the animation
  update(deltaTime) {
    if (this.currentState === null) {
      console.error('No state set for Animator');
      return;
    }

    const animation = this.animations[this.currentState]; // Gets the current animation
    this.elapsedTime += deltaTime; // Adds the time that has passed since the last frame change to the elapsed time

    // If the elapsed time is greater than or equal to the frame duration, change the frame
    // If the elapsed time is greater than or equal to the frame duration, change the frame
    if (this.elapsedTime >= animation.frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % animation.frameCount; // Goes back to the first frame after the last frame
      this.elapsedTime = 0; // Resets the elapsed time

      // Get the Renderer component and set its image to the sprite sheet of the current animation
      const renderer = this.gameObject.getComponent(Renderer); // Use the imported Renderer class
      renderer.image = animation.spriteSheet;

      // Calculate the width of a single frame and update the source properties of the Renderer
      const frameWidth = renderer.image.width / animation.frameCount;
      renderer.sourceX = this.currentFrame * frameWidth;
      renderer.sourceY = 0;
      renderer.sourceWidth = frameWidth;
      renderer.sourceHeight = renderer.image.height;
    }
  }
}
export default Animator;