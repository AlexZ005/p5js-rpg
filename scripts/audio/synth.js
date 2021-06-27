//AlexWang A18 Timbre
//https://editor.p5js.org/AlexWang/sketches/4nk39VR-I
var a18synth = new Tone.PolySynth({
	"oscillator" : {
		"type" : "square"
 },
detune : 0 ,
filter : {
Q : 6 ,
rolloff : -24
} ,
envelope : {
attack : 0.005 ,
decay : 0.1 ,
sustain : 0.9 ,
release : 1
} ,
filterEnvelope : {
attack : 0.06 ,
decay : 0.2 ,
sustain : 0.5 ,
release : 2 ,
baseFrequency : 200 ,
octaves : 7 ,
exponent : 2
}
}).toMaster();



function setupSynth() {
  //createCanvas(710,670);
  textSize(20);
  //background(0);
  text('Press a', 100,300);
   analyzer = new Tone.Waveform(256);
  a18synth.connect(analyzer);
  console.log("Press a");
   
}

function drawSynth() {
   let waveform = analyzer.getValue();
  
  strokeWeight(1);
  noFill();
  stroke(255);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
  
  

}

function keyPressed(){
  if(key == 'a'){
a18synth.triggerAttackRelease(["C#2","E3"], "8n");
background(0);
    fill(255);
    noStroke();
text('Press s', 20,30);
  }
   if(key == 's'){
a18synth.triggerAttackRelease(["C#2","E3"], "8n");
background(0);
      fill(255);
    noStroke();
text('Press d', 20,30);
  }
    if(key == 'd'){
a18synth.triggerAttackRelease(["G#2","G#3"], "8n");
background(0);
      fill(255);
    noStroke();
text('Press f', 20,30);
    }
    if(key == 'f'){
a18synth.triggerAttackRelease("C#4", "8n");
background(0);
      fill(255);
    noStroke();
text('Press g', 20,30);
  }
   if(key == 'g'){
a18synth.triggerAttackRelease(["F#2","A#3"], "8n");
background(0);
     fill(255);
    noStroke();
text('Press h', 20,30);
  }
  if(key == 'h'){
a18synth.triggerAttackRelease(["F#2","A#3"], "8n");
background(0);
    fill(255);
    noStroke();
text('Press j', 20,30);
  }
   if(key == 'j'){
a18synth.triggerAttackRelease(["C#3","C#4"], "8n");
background(0);
      fill(255);
    noStroke();
text('Press k', 20,30);
  }
  if(key == 'k'){
a18synth.triggerAttackRelease("F#4", "8n");
background(0);
    fill(255);
    noStroke()
text('Press z', 20,30);
  }
   if(key == 'z'){
a18synth.triggerAttackRelease(["A2", "C#4"], "8n");
background(0);
     fill(255);
    noStroke();
text('Press x',20,30);
  }
    if(key == 'x'){
a18synth.triggerAttackRelease(["A2", "C#4"], "8n");
background(0);
      fill(255);
    noStroke();
text('Press c', 20,30);
  }
  
    if(key == 'c'){
a18synth.triggerAttackRelease(["E3", "E4"], "8n");
background(0);
      fill(255);
    noStroke();
text('Press v', 20,30);
  }
   if(key == 'v'){
a18synth.triggerAttackRelease("A4", "8n");
background(0);
     fill(255);
    noStroke();
text('Press a', 20,30);
  }
}

