let a;
let b;

let delta;

let osc, playing, freq, amp;

let mode = "";

let angle = 0.1,
    w = 24,
    ma,
    maxD;


//perlin
let t = 0;
let t1 = 0;
let sel1 = 0,
    sel2 = 0;

//Particle movers
let c = {
    "width": 400,
    "height": 400
}
let cx = c.width / 2,
    cy = c.height / 2
let movers = []
let moverCount = 50

let timer;
let counter = 0;


function setup() {

    //setup font
    font = loadFont('fonts/Roboto-Medium.ttf');
    if (mode == "") {
        let cnv = createCanvas(400, 400, P2D);
        cnv.mousePressed(playOscillator);
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
    //Sliders
    // sizeSlider = createSlider(1, 1440, 1440);
    // sizeSlider.position(20, 20);
    // widthSlider = createSlider(1, 30, 1, .1);
    // widthSlider.position(20, 50);
    // angleSlider = createSlider(1, 65, 1, .1);
    // angleSlider.position(20, 80);


    ma = atan(1);
    maxD = dist(0, 0, 200, 200);


    angleMode(DEGREES)
    for (let i = 0; i < moverCount; i++) {
        movers.push(new Mover)
    }

    timer = createP('timer');
    setInterval(timeIt, 500);

}

function timeIt() {
    timer.html(counter);
    counter++;
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
    //radar();

    //    sinWave();

    //lifeGauge();
    //shape3D();
    //perlin()
    //archimedeanSpiral();
    //cubewave();


    //flower(); //remove background for flower
    //circles();    //random color circles

    //Particle mouse
    // background("rgba(0, 0, 0, 0.05)")
    // for (let i=0; i<moverCount; i++) {
    //   movers[i].update()
    //   movers[i].checkEdges()
    //   movers[i].display()
    // }

    // push();
    // circle(freq, 100, 100);
    // document.getElementsByClassName("score")[0].innerHTML = freq;
    // pop();

    //fontHelpers();

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