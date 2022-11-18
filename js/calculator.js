// Global vars
let current_val = undefined;
let operand_1 = "";
let operator = "";
let operand_2 = "";
let result = "";

function eval(operand_1, operator, operand_2) {
  switch (operator) {
    case "+":
      current_val = operand_1 + operand_2;
      break;
    case "*":
      current_val = operand_1 * operand_2;
      break;
    case "-":
      current_val = operand_1 - operand_2;
      break;
    case "/":
      current_val = operand_1 / operand_2;
      break;
    default:
      current_val = undefined;
      break;
  }
  return current_val;
}

function active_button(value) {
  if (value in document.querySelectorAll(".digits")) {
    if (operator === "") {
      operand_1 += value;
      result = operand_1;
    } else {
      operand_2 += value;
      result = operand_1 + " " + operator + " " + operand_2;
    }
  } else {
    if (value === "=") {
      result = eval(parseInt(operand_1), operator, parseInt(operand_2));
    } else if (value === "C") {
      operand_1 = "";
      operand_2 = "";
      operator = "";
      result = "";
    } else {
      if (operand_1 !== "" && operand_2 !== "") {
        operand_1 = eval(parseInt(operand_1), operator, parseInt(operand_2));
        operand_2 = "";
      }
      operator = value;
      result = operand_1 + " " + operator;
    }
  }
  document.getElementById("result").innerText = result;
}

function add_listeners() {
  const lst = document.querySelectorAll(".digits, .operators, #eval, #reset");
  for (let i = 0; i < lst.length; i++) {
    lst[i].addEventListener("click", () => active_button(lst[i].textContent));
  }
}

function main() {
  add_listeners();
}

main();
