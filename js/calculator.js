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
      current_val = operand_1;
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
      result = eval(parseFloat(operand_1), operator, parseFloat(operand_2));
      operand_1 = result;
      operand_2 = "";
      operator = "";
    } else if (value === "C") {
      operand_1 = "";
      operand_2 = "";
      operator = "";
      result = "";
    } else if (value === "erase") {
      if (operand_2 === "" && operator === "") {
        operand_1 = operand_1.slice(0, -1);
        result = operand_1;
      } else if (operand_2 === "") {
        operator = "";
        result = operand_1;
      } else {
        operand_2 = operand_2.slice(0, -1);
        result = operand_1 + " " + operator + " " + operand_2;
      }
    } else if (value === ".") {
      if (operand_2 === "") {
        operand_1 += ".";
        result = operand_1;
      } else {
        operand_2 += ".";
        result = operand_1 + " " + operator + " " + operand_2;
      }
    } else if (value === "pm") {
      if (operand_2 === "") {
        if (operand_1[0] === "-") {
          operand_1 = operand_1.slice(1);
        } else {
          operand_1 = "-" + operand_1;
        }
        result = operand_1;
      } else {
        if (operand_2[0] === "-") {
          operand_2 = operand_2.slice(1);
        } else {
          operand_2 = "-" + operand_2;
        }
        result = operand_1 + " " + operator + " " + operand_2;
      }
    } else {
      if (operand_1 !== "" && operand_2 !== "") {
        operand_1 = eval(
          parseFloat(operand_1),
          operator,
          parseFloat(operand_2)
        );
        operand_2 = "";
      }
      operator = value;
      result = operand_1 + " " + operator;
    }
  }
  document.getElementById("result").innerText = result;
}

function add_listeners() {
  const lst_by_text = document.querySelectorAll(
    ".digits, .operators, #eval, #reset, #point"
  );
  for (let i = 0; i < lst_by_text.length; i++) {
    lst_by_text[i].addEventListener("click", () =>
      active_button(lst_by_text[i].textContent)
    );
  }
  const lst_by_value = document.querySelectorAll("#erase, #pm");
  for (let i = 0; i < lst_by_value.length; i++) {
    lst_by_value[i].addEventListener("click", () =>
      active_button(lst_by_value[i].value)
    );
  }
}

function main() {
  add_listeners();
}

main();
