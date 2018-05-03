document.addEventListener("DOMContentLoaded", function () {


let buttons = document.querySelectorAll("button");
let display = document.querySelector("#display");
let display_operation = document.querySelector("#display_operation");
let display_result = document.querySelector("#display_result");


let calculation = "";
let equal = document.querySelector("#equal");

// display the buttons that are clicked
buttons.forEach( button => {
  button.addEventListener("click", () => {
    // if user click equal calculate the operation
    if(button.innerHTML === "=") {
      calculateResult(calculation);
    }
    // if user click clear, delete everything
    else if (button.id === "clear"){
      calculation = "";
      display_operation.innerHTML = calculation;
      display_result.innerHTML = "";
    }
    // if user click delete, remove last value
    else if (button.id === "delete"){
      calculation = calculation.slice(0,-1);
      display_operation.innerHTML = calculation;
      calculateResult(calculation);
      
    }
    // if user click numbers or operators just display them
    else  {
      calculation += button.innerHTML;
      display_operation.innerHTML = calculation;
      return calculation;
    }
    }
  );
});

//calculateResult function
function calculateResult(string){
  display_result.innerHTML = eval(string);
  if (display_result.innerHTML === "undefined") {
    display_result.innerHTML = "";
  }
}

});