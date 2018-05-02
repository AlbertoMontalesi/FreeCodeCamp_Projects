document.addEventListener("DOMContentLoaded", function () {


let buttons = document.querySelectorAll("button");
let display = document.querySelector("#display");

buttons.forEach( button => {
  button.addEventListener("click", () => {
    console.log(button.innerHTML);  
    display.innerHTML += button.innerHTML;
    }
  )
});

});