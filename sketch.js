let a;
let b;

let delta;

let osc, playing, freq, amp;

let mode = "";

    let angle = 0.1,
    w=24,
    ma,
    maxD;


      //perlin
  let t = 0;
  let t1= 0;
  let sel1 = 0, sel2 = 0;


function setup() {
    
        //setup font
    font = loadFont('fonts/Roboto-Medium.ttf');
    if (mode == ""){
      let cnv = createCanvas(400, 400, P2D);
      
    } else {
    //angleMode(DEGREES)
    let cnv = createCanvas(400, 400, WEBGL);
    cnv.mousePressed(playOscillator);
  }

    osc = new p5.Oscillator('sine');

    a = 5;
    b = 2;
    delta = 0;

    detailX = createSlider(-401, 400, 1);
    detailX.position(10, height + 5);
    detailX.style('width', '80px');
    createP(detailX.value());
    
    createP("test").addClass("score")

    synth = new p5.Oscillator('sine');

    let angle = 0;
    sizeSlider = createSlider(1, 1440, 1440);
    sizeSlider.position(20, 20);
    widthSlider = createSlider(1, 30, 1, .1);
    widthSlider.position(20, 50);
    angleSlider = createSlider(1, 65, 1, .1);
    angleSlider.position(20, 80);


    ma = atan(1);
  maxD=dist(0, 0, 200, 200);


  
}

function draw() {
    background(51);
    //translate(0, 0, detailX.value())

    //camera(mouseX, 0, 460, 0, 0, 0, 0, 1, 0);
    //translate(width / 2, height / 2, -100);
    //    stroke(255);
    //  noFill();
    //box(200);

    stroke(255, 100);

    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    delta++;
   // translate(-200, -200)
    radar();

    let a = 0.0;
    let inc = TWO_PI / 25.0;
    for (let i = 0; i < 50; i++) {
        line(i * 4, 50, i * 4, 50 + sin(a) * 40.0 * amp);
        a = a + inc;
    }

    var lifeGauge;
    var maxLifeGauge = 140;

    push();
    //https://graphicbeats.net/data/script.js
    translate(100, 100)
    fill(255);
    var lifeSpacer = 270;
    noStroke();
    textSize(8);
    text('L I F E', -maxLifeGauge / 1.3, lifeSpacer + 5);
    rect(-80, lifeSpacer - 5, 1, 16);
    rect(80, lifeSpacer - 5, 1, 16);
    rect(-maxLifeGauge / 2, lifeSpacer, lifeGauge, 6);
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(-maxLifeGauge / 2, lifeSpacer, maxLifeGauge, 6);
    pop();


   //shape3D();
   perlin()
   //archimedeanSpiral();
   //cubewave();
   push();
   circle(freq,100,100);
   document.getElementsByClassName("score")[0].innerHTML = freq;   
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