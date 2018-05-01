document.addEventListener("DOMContentLoaded", function (event) {

// grab the div with the session counter
var sessionCounter = document.querySelector("#session_count div");
// grab the whole pomodoro
var pomodoro = document.querySelector("#clock");
var myBody = document.querySelector("body");
// initialize the Clock and display the initial values
let clock = new Clock();
clock.displayCurrentTime();
clock.displayWorkTime();
clock.displayBreakTime();
clock.displaySessionCount();



/* my vars */

// grab the timer
let timer = document.querySelector("#timer");
// work and break time display
// var workDisplay = document.querySelector("#work_time__display");
// var breakDisplay = document.querySelector("#break_time__display");



// work and break minus and plus buttons
let workMinus = document.querySelector("#timer_work button.minus");
let workPlus = document.querySelector("#timer_work button.plus");
let breakMinus = document.querySelector("#timer_break button.minus");
let breakPlus = document.querySelector("#timer_break button.plus");
// start and reset buttons
let start = document.querySelector("#button_start");
let reset = document.querySelector("#button_reset");


// add all the event listeners on the work and break buttons and start and reset 
workMinus.addEventListener("click", ()=> {
  clock.changeWorkTime("subtract");
});

workPlus.addEventListener("click", () => {
  clock.changeWorkTime("add");
});

breakMinus.addEventListener("click", () => {
  clock.changeBreakTime("subtract");
});

breakPlus.addEventListener("click", () => {
  clock.changeBreakTime("add");
});

start.addEventListener("click", ()=> {
  clock.toggleClock();
  clock.animateBackground();
});

reset.addEventListener("click", ()=> {
  clock.reset();
});


function Clock() {
  var _this = this,
      timer, 
      active = false,
      type = "Work",
      // store the default values of our timer
      startTime = 1500,
      currentTime = 1500,
      workTime = 1500,
      breakTime = 300,
      sessionCount = 0;

  // format the time string
  function formatTime(secs) {
    let result = "";
    let seconds = secs % 60;
    let minutes = parseInt(secs / 60 ) % 60;
    var hours = parseInt(secs / 3600);
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }
     if (hours > 0) result += (hours + ":");
     result += (addLeadingZeroes(minutes) + ":" + addLeadingZeroes(seconds));
     return result;
      
  } // end of formatTime

  // add/ subtract 60 seconds from work time
  // only works if timer is not active
  this.changeWorkTime = function (str) {
    if (active === false) {
      this.reset();
      if (str === "add") {
        workTime += 60;
        // only allow to reduce if the time left is more than 1 mins
      } else if (workTime > 60) {
        workTime -= 60;
      }
      currentTime = workTime;
      startTime = workTime;
      this.displayWorkTime();
      this.displayCurrentTime();
    }
  }

    // add/ subtract 60 seconds from break time
  // only works if timer is not active
  this.changeBreakTime = function (str) {
    if (active === false) {
      this.reset();
      if (str === "add") {
        breakTime += 60;
        // only allow to reduce if the time left is more than 1 mins
      } else if (breakTime > 60) {
        breakTime -= 60;
      }
      this.displayBreakTime();
    }
  }

  // add the current time to the DOM

  this.displayCurrentTime = ()=> {
    // add the time calling our format function
    let timer = document.querySelector("#timer");
    timer.textContent = formatTime(currentTime);
    // if the type is work and the class is break, set the class to work
    let pomodoro = document.querySelector("#clock");
    if(type === "Work" && pomodoro.classList === "break"){
      pomodoro.classList = "work";
    } else if ( type === "Break" && pomodoro.classList === "work") {
      pomodoro.classList = "break";
    }
  } // end displayCurrentTime

  // add the work time to the dom
  this.displayWorkTime = ()=> {
    var workDisplay = document.querySelector("#work_time__display");
    workDisplay.textContent = parseInt(workTime / 60 ) + " min";
  }
  // add the break time to the dom
  this.displayBreakTime = ()=> {
    var breakDisplay = document.querySelector("#break_time__display");
    breakDisplay.textContent = parseInt(breakTime / 60 )+ " min" ;
  }

  // display the session count
  this.displaySessionCount = () => {
    // if we have no session, display Pomodoro Clock
    if (sessionCount === 0){
      sessionCounter.innerHTML = "Pomodoro Clock";
    } 
    // Display number of work session
    else if(type === 'Work'){
      sessionCounter.innerHTML= `Work session number ${sessionCount}`;
    }
    // if we are on break diplay a message
     else if (type === 'Break') {
      sessionCounter.innerHTML= "Take a break!";
    }
  }

  
  
  // toggle the clock
  this.toggleClock = () => {
    if (active === true){
      clearInterval(timer);
      // set the vale of the button to start or pause
      start.innerHTML = "Start";
      active = false;
    }
    else {
      start.innerHTML = "Pause";
      if (sessionCount === 0){
        sessionCount = 1;
        this.displaySessionCount();
      }
      timer = setInterval(function(){
        _this.stepDown();}, 1000);
        active = true;
    }
  } // end toggleCLock



    // steps the timer down by 1
    // when current time runs out, alternates new Session or Break
    this.stepDown = () => {
      if(currentTime > 0){
        currentTime --;
        this.displayCurrentTime();
        if(currentTime === 0){
          if(type ==="Work"){
            currentTime = breakTime;
            startTime = breakTime;
            type = "Break";
            this.displaySessionCount();
          } else {
            sessionCount ++;
            currentTime = workTime;
            startTime = workTime;
            type = "Work";
            this.displaySessionCount();
          }
        }
      }
    } // end stepDown

    // reset timer
    this.reset = () => {
      clearInterval(timer);
      active = false;
      type = "Work";
      currentTime = workTime;
      sessionCount = 0;
      start.innerHTML = "Start";
      this.displayCurrentTime();
      this.displayWorkTime();
      this.displayBreakTime();
    } // end of reset

    } // end of Clock;

}); // end dom content loaded