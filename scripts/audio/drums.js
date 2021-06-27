//Drum Machine by AlexWang
//https://editor.p5js.org/AlexWang/sketches/kDzniDfw

// Add a snare drum sound
// Play a kick/snare/snare/snare pattern

// PATTERN
var totalBeats = 0;
var currentStepD = 0;
let wD = 50;
let slider;
// Change these lines to change your pattern. 
// 1 is ON; 0 is OFF
// for convenience, let's combine the following two patterns into one array 
// var snarePattern = [0, 1, 0, 1];
// var kickPattern = [1, 0, 1, 0]; 

// var cellsD = [
//   [1, 1, 0, 1, 0, 1, 0, 1], //cellsD[0] holds the snare pattern
//   [0, 0, 1, 0, 0, 0, 1, 0],//cellsD[1] holds the kick pattern
//   [1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0],
//   [1, 1, 1, 0, 1, 0, 1, 1],
  
// ]

var cellsD = [
    [0, 1, 0, 0, 0, 1, 0, 0], //cellsD[0] holds the snare pattern
    [0, 0, 0, 1, 0, 0, 0, 1],//cellsD[1] holds the kick pattern
    [0, 1, 0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 1, 0, 0],
    
  ]

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
var kit = new Tone.Players({
  "snare": "samples/drums/505/snare2.mp3",
  "kick": "samples/drums/505/kick2.mp3",
  "808": "samples/drums/505/808.mp3",
  "clap": "samples/drums/505/clap.mp3",
  "clap2": "samples/drums/505/clap2.mp3",
  "snare3": "samples/drums/505/snare3.mp3"
  
  
});


function play() {
  Tone.Transport.start();
}

// Audio playback loop
function playBeat(time) {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    currentStepD = totalBeats % 8;

    if (cellsD[0][currentStepD] == 1) {
      kit.get("kick").start(time);
    }
    if (cellsD[1][currentStepD] == 1) {
      kit.get("snare3").start(time);
    }
    if (cellsD[2][currentStepD] == 1) {
      kit.get("808").start(time);
    }
    if (cellsD[3][currentStepD] == 1) {
      kit.get("clap").start(time);
    }
    if (cellsD[4][currentStepD] == 1) {
      kit.get("clap2").start(time);
    }
   
   

    totalBeats++;
  }
}

// GRAPHICS

function setupDrums() {

    // Connect the player output to the computer's audio output
kit.toMaster();

// Create a loop: call playBeat every half a second
// Try other durations, like "1s" and "0.25s"
Tone.Transport.scheduleRepeat(playBeat, "0.25s");

// Once all audio files have been loaded, start the Tone playhead
Tone.Buffer.on('load', play);

  //createCanvas(640,480);
  slider = createSlider(0, 255, 120);
//  slider.position(50,430);
  slider.style('width', '520px');
}

function drawDrums() {
 background(178,255,102);
let val = slider.value();
console.log(val);
Tone.Transport.bpm.value = val;

  fill(0);
  noStroke();
  for (var stepD = 0; stepD < 8; stepD++) { // we have 4 stepDs
    for (var trackD = 0; trackD < 5; trackD++) { //we have 4 trackDs
      if (cellsD[trackD][stepD] == 1) {
        rect(stepD * wD, trackD * wD, wD, wD);
      }
    }
  }
      
       fill(153, 255, 255, 70);
  rect(currentStepD * wD, 0, wD, wD * 5);
  
}

function mousePressed(){
  let stepD = floor(mouseX / wD);
  let trackD = floor(mouseY /wD);
  
//   if(cellsD[trackD][stepD] == 1){
//     cellsD[trackD][stepD] = 0;
//   }
//   else{
//     cellsD[trackD][stepD] = 1;
//   }
  
  cellsD[trackD][stepD] =!cellsD[trackD][stepD];
  
  console.log(trackD, stepD, cellsD[trackD][stepD]);
}