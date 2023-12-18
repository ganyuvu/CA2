// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  idlePlayer: new Image(), // The Image instance for the idle player.
  runPlayer: new Image(), // The Image instance for the running player.
  runEnemy: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio(),
  collect: new Audio(),
  win: new Audio(),
  lose: new Audio(),
  background: new Audio(),
};

// Set the source of the audio files.
AudioFiles.jump.src = './resources/Audio/jumpSound1.mp3';
AudioFiles.collect.src = './resources/Audio/coinSound.mp3';
AudioFiles.win.src = './resources/Audio/winSound.mp3';
AudioFiles.lose.src = './resources/Audio/loseSound.mp3';
AudioFiles.background.src = './resources/Audio/spaceTheme.mp3';

// Set the source of the player image.
//Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.idlePlayer.src = './resources/images/player/idlePlayer.png'; // Update the image path
Images.runPlayer.src = './resources/images/player/runPlayer.png'; // Update the image path

// Set the source of the enemy image.
Images.runEnemy.src = './resources/images/enemy/runEnemy.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
