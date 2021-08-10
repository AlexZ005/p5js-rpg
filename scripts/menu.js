//original from https://editor.p5js.org/kura/sketches/nso_ojdTw
//image generated with https://make.girls.moe/#/
//gif and json made using Aseprite Export
let spritesheet;
let spritedata;
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
  }
  if (keyCode == DOWN_ARROW){
    menumode += 1;
  }
  if (keyCode == ENTER){
    start(menumode)
  }
}

function start(id){
  if (id === 0){
    //load game
  }
  if (id === 1){
    //start game
  }
  if (id === 2){
    //show options
    menumode = 100;
  }
}