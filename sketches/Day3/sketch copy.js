import { SpringNumber } from "../../shared/spring.js"
import { sendSequenceNextSignal } from "../../shared/sequenceRunner.js"

let clickSound;

let sceneSize;
const strokeW = 20
let objSize = sceneSize / 2

let mouseDrag = false
let stage = 0;
let stage2 = 0;

const springLine = new SpringNumber({
	position: 0, // start position
	frequency: 4, // oscillations per second (approximate)
	halfLife: 0.2 // time until amplitude is halved
})

const springLineY = new SpringNumber({
	position: 0, // start position
	frequency: 4, // oscillations per second (approximate)
	halfLife: 0.2 // time until amplitude is halved
})

window.setup = function () {
	clickSound = loadSound('Audio/click.wav');
	createCanvas(windowWidth, windowHeight);
	centerX = width / 2
    centerY = height / 2
	sceneSize = min(width, height)
	objSize = sceneSize / 2;
	springLine.position = 0
	springLineY.position = 0
}

window.windowResized = function () {
	resizeCanvas(windowWidth, windowHeight);
	centerX = width / 2
    centerY = height / 2
}

window.mouseDragged = function(){

}

window.mouseReleased = function(){
	mouseDrag = false;
}

window.mousePressed = function () {
	if(stage == 4)
	{
		clickSound.play();
		stage = 5;
		linesScalesX.target = objSize;
		linesScalesY.target = objSize;
		gridCol.target = 0;
	}
}

window.keyPressed = function () {
	if(canClick)
	{
		if (keyCode === LEFT_ARROW) {
			if(stage <= 0 || stage >= 5)
			{
				return;
			}
			clickSound.play();
			stage--;
			back = true;
			//canClick = false;
			timeout();
		}
		else if(keyCode === RIGHT_ARROW){
			if(stage >= 4)
			{
				return;
			}
			clickSound.play();
			stage++;
			back = false;
			//canClick = false;
			timeout();
		}
	}
  }

  //Timeout entre chazque click 
  let canClick = true;
  function timeout(){
	setTimeout(() => {
		canClick = true;
	  }, 500);
  }
  //---

let back = false;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
  
window.draw = function () {

	background(255);

	springLine.step(deltaTime / 1000)
	springLineY.step(deltaTime / 1000)
	sceneSize = min(width, height)
	objSize = (sceneSize / 2);

	let x = springLine.position
	let y = springLineY.position

	switch(stage){
		case 0:
			springLine.target = 0
			cross(centerX,centerY)
			line(centerX + x, centerY - objSize / 2, centerX + x, centerY + objSize / 2)
			line(centerX - x, centerY - objSize / 2, centerX - x, centerY + objSize / 2)
			break;
		case 1:
			springLine.target = objSize/4
			cross(centerX,centerY)
			//#region lines
			if(back){

				//Region Static
				line(centerX + objSize/4, centerY - objSize / 2, centerX + objSize/4, centerY + objSize / 2)
				line(centerX - objSize/4, centerY - objSize / 2, centerX - objSize/4, centerY + objSize / 2)
				//---

				//Animated
				line(centerX + x, centerY - objSize / 2, centerX + x, centerY + objSize / 2)
				line(centerX - x, centerY - objSize / 2, centerX - x, centerY + objSize / 2)
				//---
			}
			else
			{
				//Animated
				line(centerX + x, centerY - objSize / 2, centerX + x, centerY + objSize / 2)
				line(centerX - x, centerY - objSize / 2, centerX - x, centerY + objSize / 2)
				//---
			}
			//#endregion
			break;
		case 2:
			cross(centerX,centerY)
			springLine.target = objSize/2
			springLineY.target = 0
			//#region lines
			if(back)
			{
				//Static
				lineFullX();
				//---
				//Animated
				line(centerX - objSize / 2, centerY - y, centerX + objSize / 2, centerY - y)
				line(centerX - objSize / 2, centerY + y, centerX + objSize / 2, centerY + y)
				//---
			}
			else
			{
				//Static
				line(centerX + objSize/4, centerY - objSize / 2, centerX + objSize/4, centerY + objSize / 2)
				line(centerX - objSize/4, centerY - objSize / 2, centerX - objSize/4, centerY + objSize / 2)
				//---

				line(centerX + x, centerY - objSize / 2, centerX + x, centerY + objSize / 2)
				line(centerX - x, centerY - objSize / 2, centerX - x, centerY + objSize / 2)
			}
			//#endregion
			break;
		case 3:
			//Static
			lineFullX();
			//---
			springLineY.target = objSize/4
			//#region lines
			if(back)
			{
				line(centerX - objSize / 2, centerY - objSize/4, centerX + objSize / 2, centerY - objSize/4)
				line(centerX - objSize / 2, centerY + objSize/4, centerX + objSize / 2, centerY + objSize/4)
				//Animated
				line(centerX - objSize / 2, centerY - y, centerX + objSize / 2, centerY - y)
				line(centerX - objSize / 2, centerY + y, centerX + objSize / 2, centerY + y)
				//---
			}
			else
			{
				//Animated
				line(centerX - objSize / 2, centerY - y, centerX + objSize / 2, centerY - y)
				line(centerX - objSize / 2, centerY + y, centerX + objSize / 2, centerY + y)
				//---
			}
			//#endregion
			break;
		case 4:
			lineFullX();
			springLineY.target = objSize/2
			//#region lines
			if(back)
			{
				//Static
				lineFullX();
				//---
				//Animated
				line(centerX - objSize / 2, centerY - objSize/4, centerX + objSize / 2, centerY - objSize/4)
				line(centerX - objSize / 2, centerY + objSize/4, centerX + objSize / 2, centerY + objSize/4)
				//---
			}
			else{
				//Static
				line(centerX - objSize / 2, centerY - objSize/4, centerX + objSize / 2, centerY - objSize/4)
				line(centerX - objSize / 2, centerY + objSize/4, centerX + objSize / 2, centerY + objSize/4)
				//---
				//Animated
				line(centerX - objSize / 2, centerY - y, centerX + objSize / 2, centerY - y)
				line(centerX - objSize / 2, centerY + y, centerX + objSize / 2, centerY + y)
				//---
			}
			//#endregion
			break;
		case 5:
			fullLinesXY();
			console.log("5");
			break;
	}

	switch(stage2){
		
	}
	//grid(centerX,centerY)

}

const linesScalesX = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.1 // time until amplitude is halved
})

const linesScalesY = new SpringNumber({
	position: 0, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.1 // time until amplitude is halved
})

const gridCol = new SpringNumber({
	position: 255, // start position
	frequency: 1, // oscillations per second (approximate)
	halfLife: 0.1 // time until amplitude is halved
})



function fullLinesXY(){

	linesScalesY.step(deltaTime / 1000)
	linesScalesX.step(deltaTime / 1000)
	gridCol.step(deltaTime / 2500)

	let x = linesScalesX.position
	let y = linesScalesY.position
	let r = gridCol.position
	/*
	//Vertical
	line(centerX - objSize/2, centerY - objSize / 2, centerX - objSize/2, centerY + objSize / 2)
	line(centerX - objSize/4, centerY - objSize / 2, centerX - objSize/4, centerY + objSize / 2)
	line(centerX, centerY - objSize / 2, centerX, centerY + objSize / 2)
	line(centerX + objSize/4, centerY - objSize / 2, centerX + objSize/4, centerY + objSize / 2)
	line(centerX + objSize/2, centerY - objSize / 2, centerX + objSize/2, centerY + objSize / 2)

	//Horiontal
	line(centerX - objSize / 2, centerY - objSize / 2, centerX + objSize / 2, centerY - objSize / 2)
	line(centerX - objSize / 2, centerY - objSize / 4, centerX + objSize / 2, centerY - objSize / 4)
	line(centerX - objSize / 2, centerY, centerX + objSize / 2, centerY)
	line(centerX - objSize / 2, centerY + objSize / 4, centerX + objSize / 2, centerY + objSize / 4)
	line(centerX - objSize / 2, centerY + objSize / 2, centerX + objSize / 2, centerY + objSize / 2)
	*/

	fill(r,0,0)

	grid(centerX,centerY);

	fill(0,0,0)

	rectMode(CENTER)

	noStroke()

	for(let v = 0; v < 5; v++)
	{
		rect(centerX - objSize / 2 + (objSize / 4) * v,centerY,20,(objSize + 20) - x,10)
	}

	for(let h = 0; h < 5; h++)
	{
		rect(centerX,centerY - objSize / 2 + (objSize / 4) * h,(objSize + 20) - x, 20,10)
	}

	/*
	//Vertical
	line(centerX - objSize/2, centerY - objSize / 2, centerX - objSize/2, centerY + objSize / 2)
	line(centerX - objSize/4, centerY - objSize / 2, centerX - objSize/4, centerY + objSize / 2)
	line(centerX, centerY - objSize / 2, centerX, centerY + objSize / 2)
	line(centerX + objSize/4, centerY - objSize / 2, centerX + objSize/4, centerY + objSize / 2)
	line(centerX + objSize/2, centerY - objSize / 2, centerX + objSize/2, centerY + objSize / 2)

	//Horiontal
	line(centerX - objSize / 2, centerY - objSize / 2, centerX + objSize / 2, centerY - objSize / 2)
	line(centerX - objSize / 2, centerY - objSize / 4, centerX + objSize / 2, centerY - objSize / 4)
	line(centerX - objSize / 2, centerY, centerX + objSize / 2, centerY)
	line(centerX - objSize / 2, centerY + objSize / 4, centerX + objSize / 2, centerY + objSize / 4)
	line(centerX - objSize / 2, centerY + objSize / 2, centerX + objSize / 2, centerY + objSize / 2)
*/

}

function lineFullX(){
	cross(centerX,centerY)

	line(centerX + objSize/4, centerY - objSize / 2, centerX + objSize/4, centerY + objSize / 2)
	line(centerX - objSize/4, centerY - objSize / 2, centerX - objSize/4, centerY + objSize / 2)

	line(centerX + objSize/2, centerY - objSize / 2, centerX + objSize/2, centerY + objSize / 2)
	line(centerX - objSize/2, centerY - objSize / 2, centerX - objSize/2, centerY + objSize / 2)
}

function grid(cX,cY){
	//push();
	//fill(0,0,0)
	noStroke()

	const gridCount = 5
	const pointSize = strokeW

	for (let x = 0; x < gridCount; x++) {
		for (let y = 0; y < gridCount; y++) {
			const xPos = map(x, 0, gridCount - 1, cX - objSize / 2, cX + objSize / 2, x)
			const yPos = map(y, 0, gridCount - 1, cY - objSize / 2, cY + objSize / 2, y)
			circle(xPos, yPos, pointSize)
		}
	}
	//pop()
}

function cross(cX,cY){
	fill(0)
	noStroke()
	rectMode(CENTER)
	strokeWeight(strokeW)
	stroke(0)
	line(cX - objSize / 2, cY, cX + objSize / 2, cY)
	line(cX, cY - objSize / 2, cX, cY + objSize / 2)
}