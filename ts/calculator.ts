// Global vars
let calculation_lst: string[] = [];
let result: string = "";
const operators: string[] = ["+", "-", "/", "*"];
let mode: string = "simple";
let history_lst: string[] = [];
// let current_val = undefined;
// let operand_1 = "";
// let operator = "";
// let operand_2 = "";

function active_calculator_button(value: string): void {
  if (value in document.querySelectorAll(".digits")) {
    add_digits(value);
  } else if (value === "=") {
    calculate();
  } else if (value === "C") {
    reset();
  } else if (value === "erase") {
    erase();
  } else if (value === ".") {
    add_point();
  } else if (value === "pm") {
    plus_minus();
  } else if (operators.includes(value)) {
    add_operator(value);
  }
  document.getElementById("result").innerText = result;
}

function join_lst(lst: string[]): string {
  let output: string = "";
  for (const val of lst) {
    output += val + " ";
  }
  return output;
}

function add_digits(value: string): void {
  const last_idx: number = calculation_lst.length - 1;
  if (
    calculation_lst.length === 0 ||
    operators.includes(calculation_lst[last_idx])
  ) {
    calculation_lst.push(value);
  } else {
    calculation_lst[last_idx] += value;
  }
  result = join_lst(calculation_lst);
}

function add_operator(value: string): void {
  const last_idx: number = calculation_lst.length - 1;
  if (
    calculation_lst.length === 0 ||
    !operators.includes(calculation_lst[last_idx])
  ) {
    calculation_lst.push(value);
  } else {
    calculation_lst[calculation_lst.length - 1] = value;
  }
  if (mode === "simple") {
    if (calculation_lst.length > 3) {
      const temp_result: string = String(
        eval(join_lst(calculation_lst.slice(0, -1)))
      );
      calculation_lst = [temp_result, value];
    }
  }
  result = join_lst(calculation_lst);
}

function calculate(): void {
  const expression: string = join_lst(calculation_lst);
  result = eval(expression);
  update_history(expression + "=" + String(result));
  calculation_lst = [String(result)];
}

function update_history(expression: string): void {
  history_lst.push(expression);
  const history_div: HTMLElement = document.getElementById("history_list");
  history_div.innerHTML = "";
  for (const val of history_lst.reverse()) {
    const new_line: HTMLElement = document.createElement("p");
    new_line.textContent = val;
    new_line.style.textAlign = "center";
    history_div.appendChild(new_line);
  }
}

function reset(): void {
  calculation_lst = [];
  result = "";
}

function add_point(): void {
  const last_idx: number = calculation_lst.length - 1;
  if (
    !operators.includes(calculation_lst[last_idx]) &&
    !calculation_lst[last_idx].includes(".")
  ) {
    calculation_lst[last_idx] += ".";
  }
  result = join_lst(calculation_lst);
}

function plus_minus(): void {
  const last_idx: number = calculation_lst.length - 1;
  if (!operators.includes(calculation_lst[last_idx])) {
    if (calculation_lst[last_idx][0] === "-") {
      calculation_lst[last_idx] = calculation_lst[last_idx].slice(1);
    } else {
      calculation_lst[last_idx] = "-" + calculation_lst[last_idx];
    }
  }
  if (calculation_lst.length >= 3) {
    if (calculation_lst[last_idx - 1] === "-") {
      calculation_lst[last_idx - 1] = "+";
      calculation_lst[last_idx] = calculation_lst[last_idx].slice(1);
    }
  }
  result = join_lst(calculation_lst);
}

function erase(): void {
  const last_idx: number = calculation_lst.length - 1;
  if (calculation_lst.length === 0) {
    return;
  }
  if (calculation_lst[last_idx].length === 1) {
    calculation_lst.pop();
  } else {
    calculation_lst[last_idx] = calculation_lst[last_idx].slice(0, -1);
  }
  result = join_lst(calculation_lst);
}

function change_calc_mode(): void {
  if (mode === "simple") {
    mode = "scientific";
  } else {
    mode = "simple";
  }
  calculation_lst = [];
  result = "";
  document.getElementById("result").innerText = result;
}
