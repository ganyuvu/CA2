import Component from './component.js';
class Renderer extends Component {
  // The constructor initializes the renderer component with optional color, width, height, and image.
  constructor(color = 'white', width = 50, height =50, image = null) {
    super(); // Call the parent constructor.
    this.image = image; // Initialize the image.
    this.color = color; // Initialize the color.
    this.width = width; // Initialize the width.
    this.height = height; // Initialize the height.
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = width;
    this.sourceHeight = height;
  }

  // The draw method handles rendering the game object on the canvas.
  draw(ctx) {
    // If an image is provided and it has finished loading, draw the image.
    if (this.image && this.image.complete) {
      // Get the position and dimensions of the game object.
      const sx = this.sourceX;
      const sy = this.sourceY;
      const sw = this.sourceWidth;
      const sh = this.sourceHeight;
      const x = this.gameObject.x;
      const y = this.gameObject.y;
      const w = this.width;
      const h = this.height;

      // Check if the image should be flipped horizontally based on the direction of the game object.
      const flipX = this.gameObject.direction === -1;
      if (!flipX) {
        // If the image should not be flipped, draw it as is.
        ctx.drawImage(this.image, sx, sy, sw, sh, x, y, w, h);
      } else {
        // If the image should be flipped, save the current drawing state,
        // translate and scale the drawing context to flip the image,
        // draw the image, and then restore the drawing state.
        ctx.save();
        ctx.translate(x + w, y);
        ctx.scale(-1, 1);
        ctx.drawImage(this.image,sx, sy, sw, sh, 0, 0, w, h);
        ctx.restore();
      }
    } else {
      // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
      ctx.fillStyle = this.color;
      ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
    }
  }
}

// The Renderer class is then exported as the default export of this module.
export default Renderer;
