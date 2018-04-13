document.addEventListener("DOMContentLoaded", function (event) {

// span containing the timer
var timerContainer = document.querySelector("#pomodoro_counter");
// actual timer value
var timer = document.querySelector("#pomodoro_counter").textContent;
// the timer that actually decreases
var newTimer = timer ;
// button to increase by 1
const increase = document.querySelector("#button_increase");
// button to decrease by 1
const decrease = document.querySelector("#button_decrease");
// start button
const start = document.querySelector("#button_start");


// increase timer by 1
increase.addEventListener("click", function() {
  timer ++;
  console.log(timer);
  timerContainer.textContent = timer;
});

// decrease timer by 1
decrease.addEventListener("click", function () {
  timer--;
  console.log(timer);
  timerContainer.textContent = timer;
});

// update the timer every second
var interval = null;

function countdown() {
  newTimer = timer --;
  console.log(newTimer);
  timerContainer.textContent = newTimer;
  // when the timer reaches 0 stop the interval
  if (newTimer <= 0) {
    clearInterval(interval);
    timerContainer.textContent = 0;
  }
}


// start timer on click of start
start.addEventListener("click", function(){
  interval = setInterval(countdown,100);
});

// issue if i click again it will go below zero



}); // end dom content loaded