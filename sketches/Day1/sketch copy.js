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

const c1 = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.15 // time until amplitude is halved
})

const c2 = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.15 // time until amplitude is halved
})

const c3 = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.15 // time until amplitude is halved
})

const c4 = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.15 // time until amplitude is halved
})

window.draw = function () {

    const sceneSize = min(width, height)

	spring.step(deltaTime / 10000) // deltaTime is in milliseconds, we need it in seconds
    c1.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds
    c2.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds
    c3.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds
    c4.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds

    const Corn1 = spring.position
    const Corn2 = spring.position
    const Corn3 = spring.position
    const Corn4 = spring.position
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

    rect(0, 0, objSize, objSize, c1, c2, c3, c4);

    if(!OK)
    {
        setTimeout(function(){
            c1.target = roundRadius +(random(0,50)*rotM / 5);
            c2.target = roundRadius +(random(0,50)*rotM / 5);
            c3.target = roundRadius +(random(0,50)*rotM / 5);
            c4.target = roundRadius +(random(0,50)*rotM / 5);
        }, 1000);
    }

    if(roundRadius >= maxRadius - 20 && !OK)
    {
        OK = true;
        c1.position = 20;
        c2.position = 20;
        c3.position = 20;
        c4.position = 20;
    }
    if(OK){
        if(col <= 0)
        {
            col = 0;
            return;
        }
        col -= 3;
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
