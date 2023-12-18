class Component {
    constructor() {
      this.gameObject = null;
    }
    // The init method is called when the component is added to a game object.
    update(deltaTime) {
    }
    
    // The draw method is typically called once per game update cycle (or frame) after update method, and is used for drawing the component's gameObject on the screen.
    // ctx is a reference to the drawing context of the canvas. It's used to actually draw things.
    // Like the update method, this is also empty and likely intended to be overridden by subclasses to include custom behavior.
    draw(ctx) {
    }
  }
  
  // The Component class is exported as the default export of this module, allowing it to be imported in other modules.
  export default Component;
  