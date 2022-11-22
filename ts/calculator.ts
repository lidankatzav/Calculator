// Global vars
let calculation_lst: string[] = [];
let result: string = "";
const operators: string[] = ["+", "-", "/", "*"];
let is_eval: boolean = false;
let mode: string = "simple";
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
      console.log("simple in add");
    }
  }
  result = join_lst(calculation_lst);
}

function calculate(): void {
  result = eval(join_lst(calculation_lst));
  calculation_lst = [String(result)];
  is_eval = true;
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
  if (
    calculation_lst[last_idx].length === 1 ||
    (calculation_lst.length === 1 && is_eval)
  ) {
    calculation_lst.pop();
  } else {
    calculation_lst[last_idx] = calculation_lst[last_idx].slice(0, -1);
  }
  result = join_lst(calculation_lst);
}

function change_calc_mode(): void {
  if (mode === "simple") {
    mode = "scientific";
    console.log("changed scirend");
  } else {
    mode = "simple";
    console.log("changed simple");
  }
  calculation_lst = [];
  result = "";
}
