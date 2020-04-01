// Goals 
// 1 - Time needs to be updated after every one second
//   - First need to create variables for hour, minutes, and  seconds
// Managing the time on the web page

let hoursElem = document.querySelector('#hours');
let minElem = document.querySelector('#min');
let secElem = document.querySelector('#sec');
let amPm = document.querySelector('#am-pm');


let hours = 00, minutes = 00, seconds = 00;

function getTimeByDate(date) {
  
  hours = date.getHours();
  if (hours>12) {
    amPm.innerText = 'pm.';
    hours -=12;
  } else {
    amPm.innerText = 'am.';
  }
  minutes = date.getMinutes();
  seconds = date.getSeconds();

}

function makeDoubleDigit(inp) {
  if (inp<10) {
    inp = "0"+inp;
    return inp;
  }
  return inp;
}

function runGetTimeByDate (){
  let date = new Date();
  getTimeByDate(date);
  secElem.innerText = makeDoubleDigit(seconds);
  minElem.innerText = makeDoubleDigit(minutes);
  hoursElem.innerText = makeDoubleDigit(hours);
}

runGetTimeByDate();

setInterval(() => {
  runGetTimeByDate();
}, 1000)

//Managing the day, month and  date

let dayElem = document.querySelector('#day');
let monthElem = document.querySelector('#month');
let dateElem = document.querySelector('#date');

let days = ['Sunday', 'Monday', 'Tuesday', 'Thursday','Friday', 'Saturday']

function setDateToView() {
  let date = new Date();
  dayElem.innerText = days[date.getDay()];

  monthElem.innerText = date.toDateString().slice(4,8);
  dateElem.innerText = date.toDateString().slice(9,11);
}

setDateToView();
// if ('00:00:00'===`${hours}:${minutes}:${seconds}`) {
//   setDateToView();
// }

setInterval(() => {
  setDateToView();
}, 60000)


