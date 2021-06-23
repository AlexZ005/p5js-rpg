function shape3D() {

    rotateX(60)
    push();
    translate(width / 2, height / 2)
    for (var i = 0; i < 40; i++) {

        var r = map(sin(frameCount / 21), -1, 1, 100, 200);
        var g = map(i, 0, 50, 100, 200);
        var b = map(cos(frameCount), -1, 1, 100, 200);

        stroke(r, g, b)

        rotate(frameCount / 20)

        beginShape()
        for (var j = 0; j < 360; j += 60) {
            var rad = i * 3;
            var x = rad * cos(j)
            var y = rad * sin(j); //sin(frameCount + i * 10)
            var z = sin(frameCount + i * 10) * 50
            vertex(x, y, z)
        }

        endShape(CLOSE)
    }
    pop();

}