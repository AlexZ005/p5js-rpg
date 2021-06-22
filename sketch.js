let a;
let b;

let delta;

let osc, playing, freq, amp;

function setup() {

    //setup font
    font = loadFont('fonts/Roboto-Medium.ttf');

    let cnv = createCanvas(400, 400);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    a = 5;
    b = 2;
    delta = 0;

    detailX = createSlider(1, 100, 1);
    detailX.position(10, height + 5);
    detailX.style('width', '80px');
    createP(detailX.value());
    createP("tset" + [a + b]);

    synth = new p5.Oscillator('sine');

}

function draw() {
    background(51);
    stroke(255, 100);

    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    delta++;

    radar();

    let a = 0.0;
let inc = TWO_PI / 25.0;
for (let i = 0; i < 50; i++) {
  line(i * 4, 50, i * 4, 50 + sin(a) * 40.0);
  a = a + inc;
}

var lifeGauge;
var maxLifeGauge = 140;

    push();
            //https://graphicbeats.net/data/script.js
            translate(200,100)
            fill(255);
            var lifeSpacer = 120;
            noStroke();
            text('L I F E', -maxLifeGauge / 2, lifeSpacer - 10);
            rect(-80, lifeSpacer - 5, 1, 16);
            rect(80, lifeSpacer - 5, 1, 16);
            rect(-maxLifeGauge / 2, lifeSpacer, lifeGauge, 6);
            stroke(255);
            strokeWeight(1);
            noFill();
            rect(-maxLifeGauge / 2, lifeSpacer, maxLifeGauge, 6);
    pop();    


    stroke(255);
    fill('red');
    textSize(6);
    textFont(font);

    push();
    translate(width - 180, height - 150);
    scale(3);
    text('tap to play', 20, 20);
    pop();

    push();

    translate(width - 180, height - 180);
    scale(3);
    text('freq: ' + freq, 20, 40);
    pop();

    push();
    translate(width - 180, height - 210);
    scale(3);
    text('amp: ' + amp, 20, 60);
    pop();

    if (playing) {
        // smooth the transitions by 0.1 seconds
        osc.freq(freq, 0.1);
        osc.amp(amp, 0.1);
    }
}

function radar() {
  push();
  translate(30, 20);
  line(0, 0, 30, 30);
  line(0, 30, 30, 0);
  pop();

  push();
  translate(45, 35);
  rotate(delta / 100);
  line(0, 0, 20, 0);
  rotate(PI / 3);
  line(0, 0, -20, 0);
  rotate(PI / 3);
  line(0, 0, 20, 0);
  pop();

  translate(15, 5);
  noFill();
  circle(30, 30, 20);
  circle(30, 30, 30);
  circle(30, 30, 40);
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