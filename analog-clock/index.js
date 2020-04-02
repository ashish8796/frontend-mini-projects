// Setting number in the 360 degree angle in a circle form

let frame = document.querySelector('.frame');
let radius = 130;

function createHourNumbers(number) {
  let pTag = document.createElement('p');    // creating a p tag

  pTag.classList.add('hour-number');        //making a 'hour-number' tag
  pTag.innerHTML = number;
  pTag.setAttribute('data-id', number);
  frame.insertAdjacentElement('afterbegin', pTag);
  let redAngle = (Math.PI * number * 30) / 180;
  shiftHour(pTag, redAngle);
}

for (let i = 0; i < 12; i++) {
  createHourNumbers(i + 1)
}

// Function that is calculating x,y cordinate for each no

function shiftHour(elem, angle) {
  xCord = radius * Math.sin(angle);
  yCord = radius * (1 - Math.cos(angle));

  //position numbers according to the x,y cordinate

  elem.style.left = `calc( 50% + ${xCord}px )`;
  elem.style.top = yCord + 'px';
}

//Function for moving the different clock hand;

let secElem = document.querySelector('.sec-hand');
let minElem = document.querySelector('.min-hand');
let hrElem = document.querySelector('.hr-hand');


function moveSecMinHand() {
  let date = new Date();
  
  secElem.style.tansform = 'rotate(' + 6 + 'deg)';
  minElem.style.tansform = 'rotate(' + .1 + 'deg)';
}

function moveHrHand() {
  hrElem.style.tansform = 'rotate(' + .5 + 'deg)';
}

moveSecMinHand();
moveHrHand();

setInterval(() => {
  moveSecMinHand()
}, 1000)

setInterval(() => {
  moveHrHand()
}, 60000)


