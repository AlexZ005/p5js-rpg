//original from https://editor.p5js.org/kura/sketches/nso_ojdTw
//image generated with https://make.girls.moe/#/
//gif and json made using Aseprite Export
let spritesheet;
let spritedata;

let animation = [];
let horses = [];

const separateObject = obj => {
   const res = [];
   const keys = Object.keys(obj);
   keys.forEach(key => {
      res.push({
         key: obj[key]
      });
   });
   return res;
};


class Sprite {
  constructor(animation, x, y, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
  }

  show() {
    let index = floor(this.index) % this.len;
    image(this.animation[index], this.x, this.y);
  }

  animate() {
    this.index += this.speed;
    this.x += this.speed * 15;

    if (this.x > width) {
      this.x = -this.w;
    }
  }
}
function preloadDialog() {
  spritedata = loadJSON('assets/5.chap-nod.json');
  spritesheet = loadImage('assets/5.chap-nod.png');
}

function setupDialog() {
  //createCanvas(400, 400);
  let frames = separateObject(spritedata.frames);
  console.log(separateObject(frames).length)
  for (let i = 0; i < frames.length; i++) {
    
    let pos = frames[i].key.frame;
    //console.log(pos.x)
    let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
    animation.push(img);
  }
horse = new Sprite(animation, 60, 285, random(0.1, 0.4));
  // for (let i = 0; i < 5; i++) {
  //   horses[i] = new Sprite(animation, 0, i * 75, random(0.1, 0.4));
  // }
}
function drawDialog() {
  //background(100);
  var dialogue = ["Attack","Recover","Run"];
  Say(dialogue[0]);
  Option(dialogue,2);
  
  horse.show();
  // for (let horse of horses) {
    // horse.show();
    //horse.animate();
  // }
}

function Say(dialogue){
  var x = width/10;
  var y = 270;
  var sx = width-width/5;
  var sy = 100;
  
  fill(0);
  stroke(255);
  strokeWeight(5);
  rect(x,y,sx,sy);
  
  fill(255);
  strokeWeight(0);
  textSize(16);
  text(dialogue,100+x,30+y);
}
function Option(options,num){
  var text = "";
  for(var i = 0;i < options.length;i++){
    if(num==i)text+=">";
    text+=options[i]+"\n";
  }
  Say(text);
}