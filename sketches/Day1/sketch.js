import { SpringNumber } from "../../shared/spring.js"

const spring = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.15 // time until amplitude is halved
})


let shapeId = 0
let rotateOnOff = false;
let rotM = 0;
let r = 0
let col = 0;

let roundRadius = 0;
let maxRadius;
let OK = false;


window.setup = function () {

    createCanvas(windowWidth, windowHeight);
    spring.step(deltaTime / 1) 
    spring.target = 1
    angleMode(DEGREES)
    frameCount = 60;
}

window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}


window.mousePressed = function () {
    rotateOnOff = true;
    spring.target = 0.5
}

window.mouseReleased = function () {
    rotateOnOff = false;
    spring.target = 1
}

let corner1 = 0;
let corner2= 0;
var corner3= 0;
let corner4= 0;

window.draw = function () {

    const sceneSize = min(width, height)

	spring.step(deltaTime / 10000) // deltaTime is in milliseconds, we need it in seconds
    const x = spring.position

    const centerX = width / 2
    const centerY = height / 2
    const objSize = sceneSize / 2
    maxRadius = objSize / 2
    

    background(255);

    SpeedManager();

    noStroke()
    rectMode(CENTER)
    push();
    translate(centerX, centerY);
    rotate((r+=rotM));
    //scale(x);
    fill(col, col / 5,0)

    rect(0, 0, objSize, objSize, corner1, corner2, corner3, corner4);

    if(!OK)
    {
        corner1 = roundRadius +(random(0,50)*rotM / 5);
        corner2 = roundRadius +(random(0,50)*rotM / 5);
        corner3 = roundRadius +(random(0,50)*rotM / 5);
        corner4 = roundRadius +(random(0,50)*rotM / 5);
    }
    else
    {
        if(corner1 > 0)
        {
            corner1-= 0.01;
        }
        else if(corner2 > 0)
        {
            corner2-=0.01;
        }
        else if(corner3 > 0)
        {
            corner3-=0.01;
        }
        else if(corner4 > 0)
        {
            corner4-=0.01;
        }
        else{
            corner1 = 0;
            corner2 = 0;
            corner3 = 0;
            corner4 = 0;
        }
        corner1 = roundRadius + corner1;
        corner2 = roundRadius + corner2;
        corner3 = roundRadius + corner3;
        corner4 = roundRadius + corner4;
    }

    if(roundRadius >= maxRadius - 20 && !OK)
    {
        OK = true;
    }
    if(OK){
        if(col <= 0)
        {
            col = 0;
            return;
        }
        col -= 1;
        console.log(col);
        console.log(r);
        console.log(rotM);
    }
    pop();


}

function SpeedManager(){
    switch (rotateOnOff){
        case true:
            if(OK)
            {
                break;
            }
            rotM += 0.05;
            roundRadius += 0.5;
            if(rotM > 10)
            {
                col += 1;
            }
            break;
        case false:
            if(OK)
            {
                break;
            }
            if(rotM <= 0.1)
            {
                rotM = 0;
                roundRadius = 0;
                break;
            }
            rotM -= 0.05;
            roundRadius -= 0.5;
            if(col <= 0)
            {
                col = 0;
                break;
            }
            col -= 1;
            break;
    }
}
