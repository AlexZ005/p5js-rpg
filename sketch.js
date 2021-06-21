let a;
let b;

let delta;

function setup() {
    a=5;
    b=2;
    delta=0;
    createCanvas(400,400);
    

    detailX = createSlider(1, 100, 1);
    detailX.position(10, height + 5);
    detailX.style('width', '80px');
    createP(detailX.value());
    createP("tset"+[a+b]);
    
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
    
}