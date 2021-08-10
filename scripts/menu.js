//reference https://www.youtube.com/watch?v=TgHhEzKlLb4&ab_channel=Veritasium
let menumode;

function setupMenu() {
  menumode = 0;  


  // for (let i = 0; i < 5; i++) {
  //   horses[i] = new Sprite(animation, 0, i * 75, random(0.1, 0.4));
  // }
}
function drawMenu() {
  background(150);
  
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

function keyPressed(){
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
    //load game
  }
  if (id === 1){
    //start game
    console.log(items.get(1).content)
    options.start = now3;
    options.end = now3;
  }
  if (id === 2){
    //show options
    menumode = 100;
  }
}