// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  idlePlayer: new Image(), // The Image instance for the idle player.
  runPlayer: new Image(), // The Image instance for the running player.
  runEnemy: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
//Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.idlePlayer.src = './resources/images/player/idlePlayer.png'; // Update the image path
Images.runPlayer.src = './resources/images/player/runPlayer.png'; // Update the image path

// Set the source of the enemy image.
Images.runEnemy.src = './resources/images/enemy/runEnemy.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
