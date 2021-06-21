let a;
let b;

let delta;

let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');

    a=5;
    b=2;
    delta=0;
    
    detailX = createSlider(1, 100, 1);
    detailX.position(10, height + 5);
    detailX.style('width', '80px');
    createP(detailX.value());
    createP("tset"+[a+b]);

    synth = new p5.Oscillator('sine');
    
}

function draw() {
    background(51);
    stroke(255,100);

    delta++;
    
    push();
    translate(30,20);
    line(0, 0, 30, 30);
    line(0, 30, 30, 0);
    pop();
    
    push();
    translate(45,35);
    rotate(delta/100);
    line(0, 0, 20, 0);
    rotate(PI/3);
    line(0, 0, -20, 0);
    rotate(PI/3);
    line(0, 0, 20, 0);
    pop();

    translate(15,5);
    noFill();
    circle(30, 30, 20);
    circle(30, 30, 30);
    circle(30, 30, 40);
    
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  
    text('tap to play', 20, 20);
    text('freq: ' + freq, 20, 40);
    text('amp: ' + amp, 20, 60);
  
    if (playing) {
      // smooth the transitions by 0.1 seconds
      osc.freq(freq, 0.1);
      osc.amp(amp, 0.1);
    }
  }
  
  function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    playing = true;
  }
  
  function mouseReleased() {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
  }