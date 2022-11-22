// Global vars
var calculation_lst = [];
var result = "";
var operators = ["+", "-", "/", "*"];
var is_eval = false;
var mode = "simple";
// let current_val = undefined;
// let operand_1 = "";
// let operator = "";
// let operand_2 = "";
function active_calculator_button(value) {
    if (value in document.querySelectorAll(".digits")) {
        add_digits(value);
    }
    else if (value === "=") {
        calculate();
    }
    else if (value === "C") {
        reset();
    }
    else if (value === "erase") {
        erase();
    }
    else if (value === ".") {
        add_point();
    }
    else if (value === "pm") {
        plus_minus();
    }
    else if (operators.includes(value)) {
        add_operator(value);
    }
    document.getElementById("result").innerText = result;
}
function join_lst(lst) {
    var output = "";
    for (var _i = 0, lst_1 = lst; _i < lst_1.length; _i++) {
        var val = lst_1[_i];
        output += val + " ";
    }
    return output;
}
function add_digits(value) {
    var last_idx = calculation_lst.length - 1;
    if (calculation_lst.length === 0 ||
        operators.includes(calculation_lst[last_idx])) {
        calculation_lst.push(value);
    }
    else {
        calculation_lst[last_idx] += value;
    }
    result = join_lst(calculation_lst);
}
function add_operator(value) {
    var last_idx = calculation_lst.length - 1;
    if (calculation_lst.length === 0 ||
        !operators.includes(calculation_lst[last_idx])) {
        calculation_lst.push(value);
    }
    else {
        calculation_lst[calculation_lst.length - 1] = value;
    }
    if (mode === "simple") {
        if (calculation_lst.length > 3) {
            var temp_result = String(eval(join_lst(calculation_lst.slice(0, -1))));
            calculation_lst = [temp_result, value];
            console.log("simple in add");
        }
    }
    result = join_lst(calculation_lst);
}
function calculate() {
    result = eval(join_lst(calculation_lst));
    calculation_lst = [String(result)];
    is_eval = true;
}
function reset() {
    calculation_lst = [];
    result = "";
}
function add_point() {
    var last_idx = calculation_lst.length - 1;
    if (!operators.includes(calculation_lst[last_idx]) &&
        !calculation_lst[last_idx].includes(".")) {
        calculation_lst[last_idx] += ".";
    }
    result = join_lst(calculation_lst);
}
function plus_minus() {
    var last_idx = calculation_lst.length - 1;
    if (!operators.includes(calculation_lst[last_idx])) {
        if (calculation_lst[last_idx][0] === "-") {
            calculation_lst[last_idx] = calculation_lst[last_idx].slice(1);
        }
        else {
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
function erase() {
    var last_idx = calculation_lst.length - 1;
    if (calculation_lst[last_idx].length === 1 ||
        (calculation_lst.length === 1 && is_eval)) {
        calculation_lst.pop();
    }
    else {
        calculation_lst[last_idx] = calculation_lst[last_idx].slice(0, -1);
    }
    result = join_lst(calculation_lst);
}
function change_calc_mode() {
    if (mode === "simple") {
        mode = "scientific";
        console.log("changed scirend");
    }
    else {
        mode = "simple";
        console.log("changed simple");
    }
    calculation_lst = [];
    result = "";
}
