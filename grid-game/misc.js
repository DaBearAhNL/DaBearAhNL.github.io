// Other functions that I couldn't group up in any other js file so they are left here in their lonesome.

function waitFor(ms) { // Wait function that is used for the lifetime of killbricks, coins, and the immunity of the player after getting hit
return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
    }, ms)
  })
}

// These functions are just used to play a soundtrack if the player is dead or alive.
function playAliveTheme() {
  deadTheme.stop();
  aliveTheme.loop(true);
  aliveTheme.play();

  isDeadThemeOn = false;
  isAliveThemeOn = true;
}

function playDeadTheme() {
  aliveTheme.stop();
  deadTheme.loop(true);
  deadTheme.play();

  isAliveThemeOn = false;
  isDeadThemeOn = true;
}