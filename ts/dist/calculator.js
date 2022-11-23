// Global vars
var calculation_lst = [];
var result = "";
var operators = ["+", "-", "/", "*"];
var mode = "simple";
var history_lst = [];
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
    if (!operators.includes(calculation_lst[last_idx])) {
        if (calculation_lst[last_idx].length > 1) {
            if (calculation_lst[last_idx][calculation_lst[last_idx].length - 1] === ".") {
                return;
            }
        }
        calculation_lst.push(value);
    }
    else if (calculation_lst.length === 0) {
        return;
    }
    else {
        calculation_lst[calculation_lst.length - 1] = value;
    }
    if (mode === "simple") {
        if (calculation_lst.length > 3) {
            var temp_result = String(eval(join_lst(calculation_lst.slice(0, -1))));
            history_lst.push(join_lst(calculation_lst.slice(0, -1)) + " = " + temp_result);
            update_history();
            calculation_lst = [temp_result, value];
        }
    }
    result = join_lst(calculation_lst);
}
function calculate() {
    if (calculation_lst.length >= 3) {
        var expression = join_lst(calculation_lst);
        result = eval(expression);
        history_lst.push(expression + " = " + String(result));
        update_history();
        calculation_lst = [String(result)];
    }
}
function update_history() {
    var history_div = document.getElementById("history_list");
    history_div.innerHTML = "";
    for (var _i = 0, _a = history_lst.reverse(); _i < _a.length; _i++) {
        var val = _a[_i];
        var new_line = document.createElement("p");
        new_line.textContent = val;
        new_line.style.textAlign = "center";
        new_line.style.wordBreak = "break-all";
        history_div.appendChild(new_line);
    }
}
function reset() {
    calculation_lst = [];
    result = "";
    history_lst = [];
    update_history();
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
    if (calculation_lst.length === 0) {
        return;
    }
    if (calculation_lst[last_idx].length === 1) {
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
    }
    else {
        mode = "simple";
    }
    calculation_lst = [];
    result = "";
    document.getElementById("result").innerText = result;
}
