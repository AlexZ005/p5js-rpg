let a;
let b;

function setup() {
    a=5;
    b=2;
}

function draw() {
    noCanvas();
    createP("tset"+[a+b]);
}