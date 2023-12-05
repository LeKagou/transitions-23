import { SpringNumber } from "../../shared/spring.js"

let sceneSize;
let objSize;
let objSizeCircle;
let stage = 0;
let differentiel = 0;
let mouseDragState = false;

let figerTrait1 = false;
let figerTrait2 = false;


const springCircle = new SpringNumber({
	position: 500, // start position
	frequency: 2, // oscillations per second (approximate)
	halfLife: 0.10 // time until amplitude is halved
})

const springX = new SpringNumber({
	position: window.innerWidth / 2, // start position
	frequency: 2, // oscillations per second (approximate)
	halfLife: 0.5 // time until amplitude is halved
})

const springY = new SpringNumber({
	position: window.innerHeight / 2, // start position
	frequency: 2, // oscillations per second (approximate)
	halfLife: 0.5 // time until amplitude is halved
})


window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  sceneSize = min(width, height)
  objSize = sceneSize / 2;
}

window.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
}

window.mouseClicked = function (){
  if(stage == 0){
    stage = 1;
    springCircle.target = 20;
  }
}

let posMX = 0;
let posMY = 0;;

window.mouseDragged = function (){

  if(stage == 2 || stage == 3)
  {
    mouseDragState = true;
  }
}

window.mouseReleased = function (){ 

  let d = dist(window.innerWidth / 2, window.innerHeight / 2, mouseX, mouseY);
  
  if(stage == 2 && d >= 300){
    figerTrait1 = true;
    springX.position = window.innerWidth / 2;
    d = 0;
  }
  else if(stage == 3 && d >= 300){
    figerTrait2 = true;
    d = 0;
  }

  mouseDragState = false;
}

window.draw = function () {

  background(255);

  const centerX = width / 2
  const centerY = height / 2
  const strokeW = 20
  sceneSize = min(width, height)
  objSize = (sceneSize / 2);

  springX.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds
  springY.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds
  springCircle.step(deltaTime / 1000) // deltaTime is in milliseconds, we need it in seconds

	const x = springX.position
  const y = springY.position
  const sCircle = springCircle.position;

  //cross(centerX,centerY,strokeW);

  switch(stage){
    case 0:
      //Cercle Statique
      circleShape(centerX,centerY);
      break;
    case 1:
      //Cercle qui raptisse
      circleShape(centerX,centerY);
      setTimeout(function() {
        stage = 2;
      }, 1500);
      break;
    case 2:
      //Déplacement des lignes Horizontales et Verticales
      if(mouseDragState && !figerTrait1)
      {
        springY.target = mouseY
      }
      else if(!mouseDragState && !figerTrait1)
      {
        springY.target = centerY
      }
      if(figerTrait1)
      {
        springY.target = centerY + objSize / 2
        setTimeout(function() {
          stage = 3;
        }, 1500);
      }
      push()
      strokeWeight(strokeW);
      line(centerX, centerY, centerX, y);
      line(centerX, centerY, centerX, window.innerHeight - y);
      pop()
      circleShape(centerX,centerY);
      break;
      
    case 3:{

      console.log(x, springX.position, springX.target)


      push()
      strokeWeight(strokeW);
      line(centerX, centerY - objSize / 2, centerX, centerY + objSize / 2)
      pop()

      if(mouseDragState && !figerTrait2)
      {
        springX.target = mouseX
      }
      else if(!mouseDragState && !figerTrait2)
      {
        springX.target = centerX
      }
      if(figerTrait2)
      {
        springX.target = centerX - objSize / 2
        setTimeout(function() {
          //stage = 4;
        }, 1500);
      }

      push()
      strokeWeight(strokeW);
      line(centerX, centerY, x, centerY);
      line(centerX, centerY, window.innerWidth - x, centerY);
      pop()
    }
    case 4:{
      /*push()
      console.log(4);
      strokeWeight(strokeW);
      line(centerX - objSize / 2, centerY, centerX + objSize / 2, centerY)
      line(centerX, centerY - objSize / 2, centerX, centerY + objSize / 2)
      pop()*/
    }
  }

}

function circleShape(x,y){

  objSizeCircle = (sceneSize / 2) - differentiel;

  const sCircle = springCircle.position;

  //Cercle
  push()
  fill(0,0,0)
  noStroke()
  translate(x, y);
  circle(0, 0, sCircle)
  pop()
  //---
}



function cross(cX,cY,sW){
  fill(255,0,0, 0.5)
  noStroke()
  rectMode(CENTER)
  strokeWeight(sW)
  stroke(0)
  line(cX - objSize / 2, cY, cX + objSize / 2, cY)
  line(cX, cY - objSize / 2, cX, cY + objSize / 2)
}