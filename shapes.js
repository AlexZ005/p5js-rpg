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

//Archimedean Spiral (js)
//Nathan https://codepen.io/Twinbee/pen/gvMNJY
function archimedeanSpiral() {
    let angle = 0;
    let oldX = width/2;
    let oldY = height/2;
    size = sizeSlider.value();
    spiralWidth = widthSlider.value();
    angle = angleSlider.value();
    
    oldX = width/2;
    oldY = height/2;
    
    for (let i=0; i<size; i++) {
        newAngle = (angle/10) * i;
        x = (width/2) + (spiralWidth * newAngle) * Math.sin(newAngle);
        y = (height/2) + (spiralWidth * newAngle) * Math.cos(newAngle);
        
        // stroke(randomColor()); // Random Color for each line segment
        // strokeWeight(randomWeight()); // Random Weight (1-5)
        
        line(oldX, oldY, x, y);
        oldX = x;
        oldY = y;
    }

}

// Tutorial From: The Coding Train
// https://www.youtube.com/watch?v=H81Tdrmz2LA&index=122&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH
function cubewave() {
    ortho(-450, 450, -450, 450, 0, 2000);
    ambientLight(50, 50, 50, 0, -1, 0);
    directionalLight(250, 250, 250, 100, 0, 1);
    // pointLight(250, 250, 250, 100, 10, 500);
    
    translate(0, 0, -50);
    rotateX(-QUARTER_PI);
    rotateY(ma);
    
    let offset = 0;
    for (let z=0; z<height; z+=w){
    
      for (let x=0; x<width; x+=w){
        push();
        
        let d = dist(x, z, width/2, height/2);
        let offset = map(d, 0, maxD, -PI, PI);
        let a = angle + offset;
        let h = floor(map(sin(a), -1, 1, 100, 300));
  
        ambientMaterial(50, 150, 220);
  
        translate(x-(width/2), 0, z-(height/2));
  
        box(w-2, h, w-2);
        pop();
      }
      offset+=.1;
    }
    
    angle-=0.1;
  }

  //Perlin noise sample by Filippo Guida
  //https://codepen.io/filippoguida/pen/oOrRWP
  function perlin(){
      //clear();
      //noFill();
      for(let i = 1; i < 80; i++) {
        strokeWeight(noise(t));
        bezier(
          mouseX,
          mouseY, //[height/2, i*8, 0, random(8)][sel1%4]
          noise(t)*width,
          noise(t*2)*height,
          noise(t*3)*width,
          noise(t + i*8)*height,
          width,
          [height/2, i*8, height, random(8)][sel2%4]
        )
      }
      
      t += 0.02;
      t1 += 0.08;
      
      if(frameCount % 200 == 0) 
        sel1++;
      
      if(frameCount % 300 == 0) 
        sel2++;
    
  }

  //Chasers by Nathan
  //https://codepen.io/Twinbee/pen/qBrWooB
  class Mover {
    constructor() {
      this.location = createVector(random(width), random(height))
      this.velocity = createVector(0, 0)
      this.acceleration = createVector(0, 0)
      this.topSpeed = 5
    }
    
    update() {
      let mouse = createVector(mouseX, mouseY)
      
      let direction = mouse.sub(this.location)
  
      direction.normalize()
  
      direction.mult(Math.random()/3)
  
      this.acceleration = direction
  
      this.velocity.add(this.acceleration)
      this.velocity.limit(this.topSpeed)
      this.location.add(this.velocity)
    }
    
    display() {
      noStroke()
      let blue = map(this.location.y, 400, 0, 0, 255)
      fill(0, blue, 255)
      rect(this.location.x, this.location.y, 2, 2)
    }
    
    checkEdges() {
      if (this.location.x > width) this.location.x = 0
      if (this.location.x < 0) this.location.x = width
      if (this.location.y > height) this.location.y = 0
      if (this.location.y < 0) this.location.y = height
    }
  }