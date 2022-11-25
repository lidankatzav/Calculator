// Global vars
let calculation_lst: string[] = []; // Array that saves the expression that is going to be calculated in parts of a number and a operator
let result: string = ""; // String representation of the result displayed to the screen
const operators: string[] = ["+", "-", "/", "*"]; // Array that represents all the IDs of the simple operators
const scientific_operators: string[] = [
  "**2",
  "**",
  "%",
  "pai",
  "sqrt",
  "root",
]; // Array that represents all the IDs of the scientific operators
let calc_mode: string = "simple"; // String representation of the calculator calc_mode (simple / scientific)
let history_lst: string[] = []; // History list of all the expressiones that calculated
let remote_mode: boolean = false; //

function active_calculator_button(value: string): void {
  // Function that receives a representation of ID of a button
  // in the calculator and activates the corresponding function according to the ID.
  if (value in document.querySelectorAll(".digits")) {
    add_digits(value);
  } else if (value === "=") {
    if (calculation_lst.length >= 3) {
      if (remote_mode) {
        remote_eval();
        result = calculation_lst[0];
      } else {
        calculate();
      }
    }
  } else if (value === "C") {
    reset();
  } else if (value === "erase") {
    erase();
  } else if (value === ".") {
    add_point();
  } else if (value === "pm") {
    plus_minus();
  } else if (scientific_operators.includes(value)) {
    add_scientific_value(value);
  } else if (operators.includes(value)) {
    add_operator(value);
  }
  if (value === "=" && remote_mode) {
    result = "";
  }
  document.getElementById("result").innerText = result;
}

function join_lst(lst: string[]): string {
  // Function that takes an array and join it into a string representation.
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
    operators.includes(calculation_lst[last_idx]) ||
    scientific_operators.includes(calculation_lst[last_idx])
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
    !operators.includes(calculation_lst[last_idx]) &&
    !scientific_operators.includes(calculation_lst[last_idx])
  ) {
    if (calculation_lst[last_idx].length > 1) {
      if (
        calculation_lst[last_idx][calculation_lst[last_idx].length - 1] ===
          "." ||
        calculation_lst[last_idx][calculation_lst[last_idx].length - 1] === "/"
      ) {
        return;
      }
    }
    calculation_lst.push(value);
  } else if (calculation_lst.length === 0) {
    return;
  } else {
    calculation_lst[calculation_lst.length - 1] = value;
  }
  if (calc_mode === "simple") {
    if (calculation_lst.length > 3) {
      const temp_result: string = String(
        eval(join_lst(calculation_lst.slice(0, -1)))
      );
      history_lst.push(
        join_lst(calculation_lst.slice(0, -1)) + " = " + temp_result
      );
      update_history();
      calculation_lst = [temp_result, value];
    }
  }
  result = join_lst(calculation_lst);
}

function calculate(): void {
  const expression: string = join_lst(calculation_lst);
  result = eval(expression);
  history_lst.push(expression + " = " + String(result));
  update_history();
  calculation_lst = [String(result)];
}

function update_history(): void {
  const history_div: HTMLElement = document.getElementById("history_list");
  history_div.innerHTML = "";
  for (const val of history_lst.reverse()) {
    const new_line: HTMLElement = document.createElement("p");
    new_line.textContent = val;
    new_line.style.textAlign = "center";
    new_line.style.wordBreak = "break-all";
    history_div.appendChild(new_line);
  }
}

function reset(): void {
  calculation_lst = [];
  result = "";
  history_lst = [];
  update_history();
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
    calculation_lst[last_idx] = String(calculation_lst[last_idx]).slice(0, -1);
  }
  result = join_lst(calculation_lst);
}

function change_calc_mode(): void {
  if (calc_mode === "simple") {
    calc_mode = "scientific";
  } else {
    calc_mode = "simple";
  }
  calculation_lst = [];
  result = "";
  document.getElementById("result").innerText = result;
}

function add_scientific_value(value: string): void {
  if (value === "**" || value == "%") {
    add_operator(value);
  } else if (value === "**2") {
    add_operator("**");
    add_digits("2");
  } else if (value === "pai") {
    add_digits(String(Math.PI));
  } else if (value === "sqrt") {
    add_operator("**");
    add_digits("1/2");
  } else if (value === "root") {
    add_operator("**");
    add_digits("1/");
  }
}

function change_remote_mode(): void {
  if (remote_mode) {
    remote_mode = false;
  } else {
    remote_mode = true;
  }
}

function remote_eval(): void {
  const expression_for_history: string = join_lst(calculation_lst);
  for (let i = 0; i < calculation_lst.length; i++) {
    if (calculation_lst[i] == "**") {
      calculation_lst[i] = "^";
    }
  }
  const URL: string =
    "https://api.mathjs.org/v4/?expr=" +
    encodeURIComponent(join_lst(calculation_lst));
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);
  fetch(URL, { signal: controller.signal })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      history_lst.push(expression_for_history + " = " + data);
      update_history();
      calculation_lst = [data];
      result = data;
      document.getElementById("result").innerText = data;
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        alert("2 seconds passed\nSwitch to local mode!");
      }
    })
    .finally(() => {
      clearTimeout(timeoutId);
    });
}
