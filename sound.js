// Miles DeCoster
// http://codeforartists.com/wordpress/?p=240
// A simple synthesizer with an 8 octave range
// Play with the mouse or on the keyboard use numers 1 - 7 and letters QWERTYU
// Uses two oscillators to make a richer tone
// The filter is a low-pass filter. The cutoff is set to the note played + an amount determined by the cut off slider

var myKeyboard = [];
var numKeys = 14;
var keyHeight = 100;
var snd1;
var myFilter;
var sliderOctave;
var octave = 0;
var sliderAttack;
var sliderDecay;
var sliderSustain;
var sliderRelease;
var sliderOscV1;
var sliderOscV2;
var sliderFilterRes;
var sliderFilterFreq;
var radio;
var scaleVal=1;
// store keyCoes for numbers 1 - 8 and letter keys qwertyu
var myKeyCodes = [49, 50, 51, 52, 53, 54, 55, 81, 87,69, 82, 84, 89, 85]; 

var c_scaleLabels = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"];
var d_scaleLabels = ["D", "E", "F#", "G", "A", "B", "C#", "D", "E", "F#", "G", "A", "B", "C#"];

function SoundMaker(freq1, wavetype) {
  
    // in this setup the initial frequency is not really used for anything as the individual notes are set 
    // when the user clicks the mouse of types on the keyboard
    this.attackLevel = .5;
    this.releaseLevel = 0;
    this.attackTime = 0.001
    this.decayTime = 0.2;
    this.susPercent = 0.5;
    this.releaseTime = 1.0;
    this.wavetype = wavetype;
  
    // create an envelope to structure each note
    this.env = new p5.Env();
    this.env.setExp(true);
    this.env.setADSR(this.attackTime, this.decayTime, this.susPercent, this.releaseTime);
    this.env.setRange(this.attackLevel, this.releaseLevel);
    
    // create the oscillators to make sound and initialize settings
    this.osc = new p5.Oscillator();
    this.osc.setType(wavetype);
    this.osc.freq(freq1);
    this.osc.amp(this.env);
    this.osc.start();
    
    this.playEnv = function() {
      //this.env.play();
      this.env.triggerAttack();
    }
    this.releaseEnv = function() {
      //this.env.play();
      this.env.triggerRelease();
    }
  }
  
  function setupPiano(){
    createCanvas(640, 480);
    myFilter = new p5.LowPass();
    myFilter.freq(1200);
    myFilter.res(10);
    snd1 = new SoundMaker(120, "triangle");
    snd1.osc.disconnect();
    snd1.osc.connect(myFilter);
    snd2 = new SoundMaker(120, "square");
    snd2.osc.disconnect();
    snd2.osc.connect(myFilter);
    sliderOctave = createSlider(0, 4, 2);
    sliderOctave.position(100, 380);
    //sliderOscV1 = createSlider(0, 10, 5);
    //sliderOscV1.position(440, 200);
    //sliderOscV2 = createSlider(0, 10, 5);
    //sliderOscV2.position(440, 230);
   
    sliderAttack = createSlider(10, 1000, 200);
    sliderAttack.position(100, 200);
    sliderDecay = createSlider(0, 1000, 180);
    sliderDecay.position(100, 230);
    sliderSustain = createSlider(0, 100, 30);
    sliderSustain.position(100, 260);
    sliderRelease = createSlider(0, 1000, 200);
    sliderRelease.position(100, 290);
    sliderFilterRes = createSlider(0, 80, 20);
    sliderFilterRes.position(300, 200);
    sliderFilterFreq = createSlider(0, 800, 0);
    sliderFilterFreq.position(300, 230);
    for (i=0; i<numKeys; i++) {
      myKeyboard.push(new MakeKey());
      myKeyboard[i].w=width/numKeys;
      myKeyboard[i].h=keyHeight;
      myKeyboard[i].pos.x=myKeyboard[i].w*i;
      myKeyboard[i].noteLabel=c_scaleLabels[i];
    }
    
    radio = createRadio('radioBox');
    radio.option('C Major', 1);
    radio.option('D Major', 2);
    radio.style('width', '200px');
    // not sure how to put this "inside" the canvas --  maybe just create interface instead of trying to use html inputs
    
  }
  
  
  
  
  
  // Miles DeCoster
  // codeforartists.com
  // Freqencies for musical notes in various formats
  
  //scales
  var c_scale = ["C", "D", "E", "F", "G", "A", "B"];
  var d_scale = ["D", "E", "F#", "G", "A", "B", "C#"];
  
  // By octaves in order C C# D D# E F F# G G# A A# B -- 12 tone octaves
  // 27.5 (A) is lowest note on a piano
  var octave_0 = [16.351, 17.324, 18.354, 19.445, 20.601, 21.827, 23.124, 24.499, 25.956, 27.5, 29.135, 30.868];
  
  var octave_1 = [32.703, 34.648, 36.708, 38.891, 41.203, 43.654, 46.249, 48.999, 51.913, 55.0, 58.27, 61.735];
  
  // 82.407 (E) lowest note on guitar
  var octave_2 = [65.406, 69.296, 73.416, 77.782, 82.407, 87.307, 92.499, 97.999, 103.826, 110, 116.541, 123.471];
  
  // 195.998 (G) lowest note on violin
  var octave_3 = [130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998, 207.652, 220, 233.082, 246.942];
  
  // 261.626 MIddle C
  var octave_4 = [261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305, 440.0, 466.164, 493.883];
  
  var octave_5 = [523.251, 554.365, 587.33, 622.254, 659.255, 698.456, 739.989, 783.991, 830.609, 880.0, 932.328, 987.767];
  
  var octave_6 = [1046.502, 1108.731, 1174.659, 1244.508, 1318.51, 1396.913, 1479.978, 1567.982, 1661.219, 1760.0, 1864.655, 1975.533];
  
  var octave_7 = [2093.005, 2217.461, 2349.318, 2489.016, 2637.021, 2793.826, 2959.955, 3135.964, 3322.438, 3520.0, 3729.31, 3951.066];
  
  var octave_8 =[4186.009, 4434.922, 4698.636, 4978.032, 5274.042, 5587.652, 5919.91, 6271.928, 6644.876, 7040.0, 7458.62, 7902.132];
  
  // These can be combined to make various other arrays
  
  // For example by note name
    
  
  var C_notes = [16.351, 32.703, 65.406, 130.813, 261.626, 523.251, 1046.502, 2093.005, 4186.009];
  var Csharp_notes = [17.324, 34.648, 69.296, 138.591, 277.183, 554.365, 1108.731, 2217.461, 4434.922];
  var D_notes = [18.354, 36.708, 73.416, 146.832, 293.665, 587.33, 1174.659, 2349.318, 4698.636];
  var Dsharp_notes = [19.445, 38.891, 77.782, 155.563, 311.127, 622.254, 1244.508, 2489.016, 4978.032];
  var E_notes = [20.601, 41.203, 82.407, 164.814, 329.628, 659.255, 1318.51, 2637.021, 5274.042];
  var F_notes = [21.827, 43.654, 87.307, 174.614, 698.456, 698.456, 1396.913, 2793.826, 5587.652];
  var Fsharp_notes = [23.124, 46.249, 92.499, 184.997, 369.994, 739.989, 1479.978, 2959.955, 5919.91];
  var G_notes = [24.499, 48.999, 97.999, 195.998, 391.995, 783.991, 1567.982, 3135.964, 6271.928];
  var Gsharp_notes = [25.956, 51.913, 103.826, 207.652, 415.305, 830.609, 1661.219, 3322.438, 6644.876];
  var A_notes = [27.5, 55, 110, 220, 440, 880, 1760, 3520, 7040];
  var Asharp_notes = [29.135, 58.27, 116.541, 233.082, 466.164, 932.328, 1864.655, 3729.31, 7458.62];
  var B_notes = [30.868, 61.735, 123.471, 246.942, 493.883, 987.767, 1975.533, 3951.066, 7902.132];
  
  
  // Making scales: C Major
  
  var c_major = [];
  var startOctave =0;
  var endOctave = 9;
  for (i=startOctave; i < endOctave;i++) {
    c_major.push(C_notes[i]);
    c_major.push(D_notes[i]);
    c_major.push(E_notes[i]);
    c_major.push(F_notes[i]);
    c_major.push(G_notes[i]);
    c_major.push(A_notes[i]);
    c_major.push(B_notes[i]);
  }
  //console.log(c_major);
  
  // for example the above loop would create the following array: 
  c_major = [16.351, 18.354, 20.601, 21.827, 24.499, 27.5, 30.868, 32.703, 36.708, 41.203, 43.654, 48.999, 55, 61.735, 65.406, 73.416, 82.407, 87.307, 97.999, 110, 123.471, 130.813, 146.832, 164.814, 174.614, 195.998, 220, 246.942, 261.626, 293.665, 329.628, 349.228, 391.995, 440, 493.883, 523.251, 587.33, 659.255, 698.456, 783.991, 880, 987.767, 1046.502, 1174.659, 1318.51, 1396.913, 1567.982, 1760, 1975.533, 2093.005, 2349.318, 2637.021, 2793.826, 3135.964, 3520, 3951.066, 4186.009, 4698.636, 5274.042, 5587.652, 6271.928, 7040, 7902.132];
  var d_major = [];
  startOctave =0;
  endOctave = 8;
  for (i=startOctave; i < endOctave;i++) {
    d_major.push(D_notes[i]);
    d_major.push(E_notes[i]);
    d_major.push(Fsharp_notes[i]);
    d_major.push(G_notes[i]);
    d_major.push(A_notes[i]);
    d_major.push(B_notes[i]);
    d_major.push(Csharp_notes[i+1]); // NOTE lowest D is above lowest C#
  }
  
  d_major = [18.354, 20.601, 23.124, 24.499, 27.5, 30.868, 34.648, 36.708, 41.203, 46.249, 48.999, 55, 61.735, 69.296, 73.416, 82.407, 92.499, 97.999, 110, 123.471, 138.591, 146.832, 164.814, 184.997, 195.998, 220, 246.942, 277.183, 293.665, 329.628, 369.994, 391.995, 440, 493.883, 554.365, 587.33, 659.255, 739.989, 783.991, 880, 987.767, 1108.731, 1174.659, 1318.51, 1479.978, 1567.982, 1760, 1975.533, 2217.461, 2349.318, 2637.021, 2959.955, 3135.964, 3520, 3951.066, 4434.922];
  
  
  
  
  function MakeKey(noteLabel) {
    
    this.w=10;
    this.h=10;
    this.pos=createVector(0,0);
    this.col = color(100, 100, 100);
    this.ismouseover = false;
    this.noteLabel = noteLabel;
    
    this.update = function() {
      
    }
    
    this.display = function() {
      stroke(0);
      fill(this.col);
      rect(this.pos.x, this.pos.y, this.w, this.h);
      noStroke();
      fill(200);
      textAlign(CENTER);
      text(this.noteLabel, this.pos.x+this.w/2, this.pos.y + this.h+20);
      
      
    };
    this.over = function() {
      if (mouseX > this.pos.x && mouseX < this.pos.x + this.w && mouseY < this.h) {
        this.col= color(255,100,100);
        this.ismouseover = true;
      } else {
        this.col= color(100,100,100);
        this.ismouseover = false;
      }
    }
    
  }


  

function mousePressed() {
    for (i=0; i<numKeys; i++) {
      myKeyboard[i].over();
     if(myKeyboard[i].ismouseover) {
       octave=14*sliderOctave.value(); // two octave keyboard
       if (scaleVal==1) {
         myFilter.freq(c_major[i+octave]+sliderFilterFreq.value()); // set the filter cutoff based on note played
         snd1.osc.freq(c_major[i+octave]);
         snd2.osc.freq(c_major[i+octave]);
         //console.log(radio.value());
       } else if (scaleVal==2) {
         myFilter.freq(c_major[i+octave]+sliderFilterFreq.value());
         snd1.osc.freq(d_major[i+octave]);
         snd2.osc.freq(d_major[i+octave]);
         //console.log(radio.value());
       } 
       snd1.playEnv();
       snd2.playEnv();
     }
   }
  }
  
  function mouseReleased() {
   for (i=0; i<numKeys; i++) {
     myKeyboard[i].col = color(100,100,100);
   }
    snd1.releaseEnv();
   snd2.releaseEnv();
  }
  function keyReleased() {
   for (i=0; i<numKeys; i++) {
     myKeyboard[i].col = color(100,100,100);
   }
   snd1.releaseEnv();
   snd2.releaseEnv();
  }
  
  function keyPressed() {
   //console.log(snd1.susPercent);
    for (i=0; i<numKeys; i++) {
     if(keyCode == myKeyCodes[i]) {
       myKeyboard[i].col = color(255,100,100);
       octave=14*sliderOctave.value(); // two octave keyboard
       if (scaleVal==1) {
         myFilter.freq(c_major[i+octave]+sliderFilterFreq.value());
         snd1.osc.freq(c_major[i+octave]);
         snd2.osc.freq(c_major[i+octave]);
       } else if (scaleVal==2) {
         myFilter.freq(c_major[i+octave]+sliderFilterFreq.value());
         snd1.osc.freq(d_major[i+octave]);
         snd2.osc.freq(d_major[i+octave]);
       } 
       snd1.playEnv();
       snd2.playEnv();
     }
   }
  }

  function drawPiano(){
      
  background(50);
  if (radio.value()) {
    scaleVal = radio.value();
  }
   if (scaleVal==1) {
    for (i=0; i<numKeys; i++) {
      myKeyboard[i].noteLabel=c_scaleLabels[i];
    }
  } else if (scaleVal==2) {
    for (i=0; i<numKeys; i++) {
      myKeyboard[i].noteLabel=d_scaleLabels[i];
    }
  }
  myFilter.res(sliderFilterRes.value());
  //myFilter.freq(sliderFilterFreq.value());
  
  snd1.attackTime=sliderAttack.value()/1000;
  snd1.decayTime=sliderDecay.value()/1000;
  snd1.susPercent=sliderSustain.value()/100;
  //snd1.susPercent=.5;
  snd1.releaseTime=sliderRelease.value()/100;
  snd1.env.setADSR(snd1.attackTime, snd1.decayTime, snd1.susPercent, snd1.releaseTime);
  //snd1.env.setRange((sliderOscV1.value()/100), snd1.releaseLevel);
  
  
  snd2.susPercent=sliderSustain.value()/100;
  snd2.attackTime=sliderAttack.value()/1000;
  snd2.decayTime=sliderDecay.value()/1000;
  snd2.releaseTime=sliderRelease.value()/100;
  snd2.env.setADSR(snd2.attackTime, snd2.decayTime, snd2.susPercent, snd2.releaseTime);
  //snd1.env.setRange(sliderOscV2.value()/100, snd2.releaseLevel);
  
  for (i=0; i<numKeys; i++) {
    myKeyboard[i].display();
  }
  fill(200);
  textSize(20);
  textAlign(LEFT);
  text("Attack " + sliderAttack.value(), 20, 220);
  text("Decay " + sliderDecay.value(), 20, 250);
  text("Sustain " + sliderSustain.value(), 20, 280);
  text("Release " + sliderRelease.value(), 20, 310);
  text("Octave", 20, 400);
  text("Filter Resonance", 470, 220);
  text("Filter Cut Off", 470, 250);
  }