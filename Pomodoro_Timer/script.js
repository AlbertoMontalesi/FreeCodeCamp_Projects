document.addEventListener("DOMContentLoaded", function (event) {

// initialize the Clock and display the initial values
let clock = new Clock();
clock.displayCurrentTime();
clock.displayWorkTime();
clock.displayBreakTime();
clock.displaySessionCount();



/* my vars */
// grab the whole pomodoro
var pomodoro = document.querySelector("#clock");
// grab the timer
let timer = document.querySelector("#timer");
// work and break time display
// var workDisplay = document.querySelector("#work_time__display");
// var breakDisplay = document.querySelector("#break_time__display");


// work and break minus and plus buttons
let workMinus = document.querySelector("#timer_work .minus");
let workPlus = document.querySelector("#timer_work .plus");

let breakMinus = document.querySelector("#timer_break .minus");
let breakPlus = document.querySelector("#timer_break .minus");
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
  clock.changeBreaTime("subtract");
});

breakPlus.addEventListener("click", () => {
  clock.changeBreakTime("add");
});

start.addEventListener("click", ()=> {
  clock.toggleClock();
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
    if(type === "Work" && pomodoro.classList.contains("break")){
      pomodoro.classList.remove("break").add("work");
    } else if ( type === "Break" && pomodoro.classList.contains("work")) {
      pomodoro.classList.remove("work").add("break");
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


    } // end of Clock;

}); // end dom content loaded