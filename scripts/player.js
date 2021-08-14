//code from https://codepen.io/Twinbee/pen/bGbXarp
// Global Variable Declarations
// let c = {
//     "width": 400,
//     "height": 400
//   }

//   let cx = c.width/2,
//       cy = c.height/2;
let map = [
    0, 1, 2, 3, 4, 5, 6, 7, 8,
    4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 62, 61, 63, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4,

];

let mapEnemies = [
    -1, 112, -1, -1, 90, -1, -1, 113, -1,
    90, -1, -1, -1, -1, -1, -1, -1, -1,
    90, -1, -1, -1, -1, -1, -1, -1, -1,
    90, -1, 90, 119, -1, -1, -1, -1, -1,
    -1, 109, 112, 112, 112, 112, 112, 112, 112,
]

let blockers = [61, 62, 63,1,2,3,5,6,7,8]
let blockersEnemy = [90, 112, 109]
let blockersNpc = [119]

function preloadPlayer() {
    tileset = loadImage("assets/blockPack_Packed.png");
}

let npc = 0;
let atk = 0;
let spellsActive = 0;
let dialogActive = 0;

// Setting up the Canvas
function setupPlayer() {
    //This allows to bind canvas to <div id="sketch-holder"></div>
    // let canvas = createCanvas(c.width, c.height);
    // canvas.parent('sketch-holder');
    player = new Player();
}

// Where the Magic Happens (It draws)
function drawPlayer() {
    //background(0);
    //drawMap(20,20);

    push()
    noSmooth();
    scale(2.5)
        //translate(100,100)
    drawTiles(map, 9, 20, 18, 28);
    player.draw();
    drawEnemies(mapEnemies, 9, 20, 18, 28)

    player.attack(atk);
    pop()

    if (dialogActive){drawDialog(npc)}
    if (spellsActive){drawSpells()}
    
    // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
// let fps = frameRate();
// fill(255);
// stroke(0);
// text("FPS: " + fps.toFixed(2), 10, height - 10);
}

function drawTiles(map, d_cols, s_cols, tilesizex, tilesizey) {
    for (let i = 0; i < map.length; i++) {
        let value = map[i];
        // source x , y
        let sx = (value % s_cols) * tilesizex;
        let sy = Math.floor(value / s_cols) * tilesizey;
        // distenation x , y
        let dx = (i % d_cols) * tilesizex;
        let dy = Math.floor(i / d_cols) * tilesizey;
        // render image
        let d = Math.floor(i / 9) * 14
            // console.log("i is " + i + " divide %" + Math.floor(i / 9))
        if (i < 9) {
            image(tileset, dx, dy, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        } else if (i >= 9) {

            image(tileset, dx, dy - d, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        }
        // else if (i < 27) {
        //     image(tileset, dx, dy-28, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        // }

    }
}

function drawEnemies(map, d_cols, s_cols, tilesizex, tilesizey) {
    for (let i = 0; i < map.length; i++) {
        let value = map[i];
        // source x , y
        let sx = (value % s_cols) * tilesizex;
        let sy = Math.floor(value / s_cols) * tilesizey;
        // distenation x , y
        let dx = (i % d_cols) * tilesizex;
        let dy = Math.floor(i / d_cols) * tilesizey;
        // render image
        let d = Math.floor(i / 9) * 14
            // console.log("i is " + i + " divide %" + Math.floor(i / 9))
        if (i < 9) {
            image(tileset, dx, dy-14, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        } else if (i >= 9) {

            image(tileset, dx, dy - d - 14, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        }
        // else if (i < 27) {
        //     image(tileset, dx, dy-28, tilesizex, tilesizey, sx, sy, tilesizex, tilesizey);
        // }

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
    for (i = 0; i < w; i++) {
        for (j = 0; j < h; j++) {
            fill('#222222');
            rect(x + (20 * i), y + (20 * j), 18, 18);
        }
    }
}

function keyPressed() {
            
    if (!spellsActive && !menuActive && !dialogActive){
        if (keyCode === UP_ARROW) {
            player.move(0,-14);
        } else if (keyCode === RIGHT_ARROW) {
            player.move(18,0);
        } else if (keyCode === DOWN_ARROW) {
            player.move(0,14);
        } else if (keyCode === LEFT_ARROW) {
            player.move(-18,0);
        }
    }
    if (keyCode === ENTER && !dialogActive) {
        spellsActive = 1 - spellsActive
        _menuChangeSound.play();
        //mySynth.play('A7');
    } else if (keyCode === ESCAPE) {
        //spellsActive = 1 - spellsActive
        menuActive = 1;
        currentScene = 1;
        options.start = now1;
        options.end = now1-1000;
        _menuChangeSound.play();
        //mySynth.play('A7');
    }

    if (menuActive){keyPressedMenu()}
    if (dialogActive){keyPressedDialog()}

}

// function dialogActive(npc) {
//     console.log("dialog for " + npc)
    
// }

class Player {
    constructor() {
        this.size = 16;
        this.x = 1+18;
        this.y = 1+14;
    }

    draw() {
        fill('#ffffff');
        rect(this.x, this.y, this.size, this.size);
    }

    move(x,y) {
        //console.log(x + " + " + y)
         
            this.x += x;        
            this.y += y;

            //check valid moves
            let block = Math.floor(this.x / 18) + (Math.floor(this.y / 14) * 9)
            console.log(block)
            if (blockers.includes(map[block])) {
                this.x -= x;
                this.y -= y;
            }
            if (blockersEnemy.includes(mapEnemies[block])) {
                this.x -= x;
                this.y -= y;
    //            currentScene = 1;
            }
            if (blockersNpc.includes(mapEnemies[block])) {
                this.x -= x;
                this.y -= y;

                npc = mapEnemies[block]
                dialogActive = 1
                //currentScene = 3;
            }
        
        //console.log("player on " + "x " + this.x + " y " + this.y + " tilemap " + map[Math.floor(this.x / 18) + (Math.floor(this.y / 14) * 9])
    }


    attack(atk) {
        switch (atk) {
            case 1:
                let boxes = 3;
                let size = 20;
                for (i = -1; i < boxes - 1; i++) {
                    fill('#ff0000');
                    rect((player.x - 1) + (i * 20), (player.y - 21), size, size);
                }
            default:

        }
    }
}