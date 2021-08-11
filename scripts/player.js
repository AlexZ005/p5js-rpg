//code from https://codepen.io/Twinbee/pen/bGbXarp
// Global Variable Declarations
// let c = {
//     "width": 400,
//     "height": 400
//   }
  
//   let cx = c.width/2,
//       cy = c.height/2;
let map = [
    41,  3, 10,
    21,22,20,50,51,52,53
];

function preloadPlayer() {
    tileset = loadImage("assets/blockPack_Packed.png");
}

  let atk = 1;
  
  // Setting up the Canvas
  function setupPlayer() {
    //This allows to bind canvas to <div id="sketch-holder"></div>
    // let canvas = createCanvas(c.width, c.height);
    // canvas.parent('sketch-holder');
    player = new Player();
  }
  
  // Where the Magic Happens (It draws)
  function drawPlayer() {
      background(0);
      //drawMap(20,20);
      drawTiles(map, 7, 20, 18, 28);

      player.draw();
      player.attack(atk);
  }
  
  function drawTiles(map, d_cols, s_cols, tilesizex, tilesizey) {
    for (let i = map.length - 1; i > -1; --i) {
        let value = map[i];
        // source x , y
        let sx = (value % s_cols) * tilesizex;
        let sy = Math.floor(value / s_cols) * tilesizey;
        // distenation x , y
        let dx = (i % d_cols) * tilesizex;
        let dy = Math.floor(i / d_cols) * tilesizey;
        // render image
        image(tileset, dx, dy, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
    }
}

  // Random Color Function for Testing
  function randomColor() {
    let r = Math.floor((Math.random() * 255) + 1);
    let g = Math.floor((Math.random() * 255) + 1);
    let b = Math.floor((Math.random() * 255) + 1);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  function drawMap(w, h) {
    let x = 0;
    let y = 0;
      for (i=0; i<w; i++) {
        for (j=0; j<h; j++) {
          fill('#222222');
          rect(x+(20*i), y+(20*j), 18, 18);
        }
      }
  }
  
  function keyPressed() {
    if (keyCode === UP_ARROW) {
      player.moveUp();
    } else if (keyCode === RIGHT_ARROW) {
      player.moveRight();
    } else if (keyCode === DOWN_ARROW) {
      player.moveDown();
    } else if (keyCode === LEFT_ARROW) {
      player.moveLeft();
    }
  }
  
  class Player {
    constructor() {
      this.size = 16;
      this.x = 1;
      this.y = 1;
    }
    
    draw() {
      fill('#ffffff');
      rect(this.x, this.y, this.size, this.size);
    }
    
    moveUp() {
      this.y-=20;
    }
    
    moveRight() {
      this.x+=20;
    }
    
    moveDown() {
      this.y+=20;
    }
    
    moveLeft() {
      this.x-=20;
    }
    
    attack(atk) {
      switch(atk) {
        case 1:
          let boxes = 3;
          let size = 20;
          for (i=-1; i<boxes-1; i++) {
            fill('#ff0000');
            rect((player.x-1)+(i*20), (player.y-21), size, size); 
          }
        default:
          
      }
    }
  }
  
  