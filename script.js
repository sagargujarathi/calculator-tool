const previous = document.querySelector(".previous");
const current = document.querySelector(".current");
const number = document.querySelectorAll(".num");
const operand = document.querySelectorAll(".operand");
const clear = document.querySelector(".all-clear");
const del = document.querySelector(".delete");
const dot = document.querySelector(".dot");
const equal = document.querySelector(".final");
let currenttext = "";
let previoustext = "";
let operation = "+";
let answer = 0;

number.forEach((button) => {
  button.addEventListener("click", () => {
    currenttext += button.innerText;
    current.innerText = currenttext;
  });
});

operand.forEach((button) => {
  button.addEventListener("click", () => {
    if (currenttext.length == 0) {
      return;
    }
    let a = currenttext[currenttext.length - 1];
    if (a == "+" || a == "*" || a == "-" || a == "÷") {
      return;
    }
    if (previoustext.length > 0) {
      let a = previoustext[previoustext.length - 1];
      if (
        (a == "+" || a == "*" || a == "-" || a == "÷") &&
        currenttext.length == 0
      ) {
        return;
      }
    }
    solve(currenttext);
    previoustext += currenttext + button.innerText;
    previous.innerText = previoustext;
    currenttext = "";
    current.innerText = currenttext;
    operation = button.innerText;
  });
});

clear.addEventListener("click", () => {
  previoustext = currenttext = "";
  current.innerText = previous.innerText = "";
  operation = "+";
});

del.addEventListener("click", () => {
  if (currenttext.length == 0) {
    return;
  }
  currenttext = currenttext.slice(0, currenttext.length - 1);
  current.innerText = currenttext;
});

dot.addEventListener("click", () => {
  if (currenttext.includes(".")) {
    return;
  }
  currenttext += ".";
  current.innerText = currenttext;
});

function solve(a) {
  let number = parseFloat(a);
  if (operation == "+") {
    answer += number;
  } else if (operation == "*") {
    answer *= number;
  } else if (operation == "-") {
    answer -= number;
  } else if (operation == "÷") {
    answer /= number;
  }
}

equal.addEventListener("click", () => {
  solve(currenttext);
  previoustext = "";
  previous.innerText = "";
  currenttext = answer.toString();
  current.innerText = currenttext;
  answer = 0;
  operation = "+";
});
