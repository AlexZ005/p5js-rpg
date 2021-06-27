// Sequencer by Luisa, uses Tone.js
//https://editor.p5js.org/luisa/sketches/od-S35sa5
var nSteps = 8;
var nTracks = 8;
var cells = [];
var playButton;
var beats = 0;
var currentStep = 0;

// Sound
var noteNames = ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3"];
var player = new Tone.Sampler(
    { 
      "A1" : "/samples/casio/A1.mp3",
      "C2" : "/samples/casio/C2.mp3",
      "E2" : "/samples/casio/E2.mp3",
      "G2" : "/samples/casio/G2.mp3"
    }
);
player.toMaster();

//Make sure all buffers have loaded
Tone.Buffer.on('load', handleMyLoadEventBlah)

function handleMyLoadEventBlah(){
	Tone.Transport.scheduleRepeat(onBeat, 0.5);
}



// Visuals
var cellWidth, cellHeight;

function setupChords() {
  // Initialize all sequencer cells. ON: 1. OFF: 0.
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = 0;
    }
  }
  
  playButton = createButton('play');
  playButton.position(560, 300);
  playButton.mouseClicked(togglePlay);
	
  createCanvas(600, 300);
  cellWidth = width / nSteps;
  cellHeight = height / nTracks;
  
}

function onBeat(time){
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      var pos = noteNames.length - 1 - track;
      player.triggerAttack(noteNames[pos], time);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}

function drawChords(){
  background(255);
  stroke(0);
  
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        fill(150 - track*30);
        rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
      }
    }
  }
  
  // Draw horizontal lines
  for(var i = 1; i <= nTracks; i++){
    var y = i*cellHeight;
    line(0, y, width, y);
  }
  
  // Draw vertical lines
  for(var i = 1; i <= nSteps; i++){
    stroke(0);
    line(i*cellWidth, 0, i*cellWidth, height);
  }
  
  // Highlight current step
  var highlight = (beats - 1 )% nSteps;
	fill(200, 60);
	noStroke();
	rect(highlight*cellWidth, 0, cellWidth, height)
	
}

function mousePressed(){
  // If the mouse is within the bounds of the canvas
  if(	0 < mouseX && mouseX < width &&
    	0 < mouseY && mouseY < height){
    
    // Determine which cell the mouse is on
    var i = floor(mouseX / cellWidth);
    var j = floor(mouseY / cellHeight);
    
    // Toggle cell on/off
    cells[j][i] = !cells[j][i];
  }
  
}

function togglePlay(){
  Tone.Transport.toggle();
}