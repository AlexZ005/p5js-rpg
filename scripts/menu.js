//reference https://www.youtube.com/watch?v=TgHhEzKlLb4&ab_channel=Veritasium
let menumode;
let menuActive = 1;
function setupMenu() {
  menumode = 0;  
  //options.start = now1-1000;
  options.end = now1-1000;

  // for (let i = 0; i < 5; i++) {
  //   horses[i] = new Sprite(animation, 0, i * 75, random(0.1, 0.4));
  // }
}
function drawMenu() {
  background(150);
  text("Keys usage:", width-250, height-100)
  text("Arrows to move", width-250, height-80)
  text("Enter to activate spells", width-250, height-60)
  text("Click to activate sounds", width-250, height-40)
  text("Demo: p5js-rpg", width-250, height-20)
  

  if (menumode === 0){
    text(">Resume", 20, 40)
    text("Start new game", 20, 60)
    text("Options", 20, 80)
  }
  if (menumode === 1){
    text("Resume", 20, 40)
    text(">Start new game", 20, 60)
    text("Options", 20, 80)
}
if (menumode === 2){
  text("Resume", 20, 40)
  text("Start new game", 20, 60)
  text(">Options", 20, 80)
}
if (menumode === 100){
  text("Sound on/off", 20, 40)
  text("Effects on/off", 20, 60)
  text(">Back to menu", 20, 80)
}

  // for (let horse of horses) {
    // horse.show();
    //horse.animate();
  // }
}

function keyPressedMenu(){
  if (keyCode == UP_ARROW){
    menumode -= 1;
    mySynth.play('A6');
  }
  if (keyCode == DOWN_ARROW){
    menumode += 1;
    mySynth.play('A6');
  }
  if (keyCode == ENTER){
    userStartAudio();
    start(menumode)
    
  }
}

function start(id){
  if (id === 0){
    //resume game
    console.log(items.get(1).content)
    options.start = now3;
    options.end = now3;
    menuActive = 0;
  }
  if (id === 1){
    //start game
    setupPlayer();
    console.log(items.get(1).content)
    options.start = now3;
    options.end = now3;
    menuActive = 0;
  }
  if (id === 2){
    //show options
    menumode = 100;
  }
}