import { SpringNumber } from "../../shared/spring.js"
import { sendSequenceNextSignal } from "../../shared/sequenceRunner.js"

let clickSound;

let sceneSize;
const strokeW = 20
let objSize = sceneSize / 2

window.setup = function () {
	clickSound = loadSound('Audio/click.wav');
	createCanvas(windowWidth, windowHeight);
	centerX = width / 2
    centerY = height / 2
	sceneSize = min(width, height)
	objSize = sceneSize / 2;
}

window.windowResized = function () {
	resizeCanvas(windowWidth, windowHeight);
	centerX = width / 2
    centerY = height / 2
}

window.mouseDragged = function(){

}

window.mousePressed = function () {

}

window.keyPressed = function () {

}

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;
  
window.draw = function () {

	background(255);

	sceneSize = min(width, height)
	objSize = (sceneSize / 2);

	grid();

}

function grid(){
	push();
	fill(0)
	noStroke()
	const gridCount = 5
	const pointSize = strokeW

	for (let x = 0; x < gridCount; x++) {
		for (let y = 0; y < gridCount; y++) {
			const xPos = map(x, 0, gridCount - 1, centerX - objSize / 2, centerX + objSize / 2, x)
			const yPos = map(y, 0, gridCount - 1, centerY - objSize / 2, centerY + objSize / 2, y)
			circle(xPos, yPos, pointSize)
		}
	}
	pop();
}
