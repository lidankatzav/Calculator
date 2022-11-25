// Global vars
var calculation_lst = []; // Array that saves the expression that is going to be calculated in parts of a number and a operator
var result = ""; // String representation of the result displayed to the screen
var operators = ["+", "-", "/", "*"]; // Array that represents all the IDs of the simple operators
var scientific_operators = [
    "**2",
    "**",
    "%",
    "pai",
    "sqrt",
    "root",
]; // Array that represents all the IDs of the scientific operators
var calc_mode = "simple"; // String representation of the calculator calc_mode (simple / scientific)
var history_lst = []; // History list of all the expressiones that calculated
var remote_mode = false; //
function active_calculator_button(value) {
    // Function that receives a representation of ID of a button
    // in the calculator and activates the corresponding function according to the ID.
    if (value in document.querySelectorAll(".digits")) {
        add_digits(value);
    }
    else if (value === "=") {
        if (calculation_lst.length >= 3) {
            if (remote_mode) {
                remote_eval();
                result = calculation_lst[0];
            }
            else {
                calculate();
            }
        }
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
    else if (scientific_operators.includes(value)) {
        add_scientific_value(value);
    }
    else if (operators.includes(value)) {
        add_operator(value);
    }
    if (value === "=" && remote_mode) {
        result = "";
    }
    document.getElementById("result").innerText = result;
}
function join_lst(lst) {
    // Function that takes an array and join it into a string representation.
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
        operators.includes(calculation_lst[last_idx]) ||
        scientific_operators.includes(calculation_lst[last_idx])) {
        calculation_lst.push(value);
    }
    else {
        calculation_lst[last_idx] += value;
    }
    result = join_lst(calculation_lst);
}
function add_operator(value) {
    var last_idx = calculation_lst.length - 1;
    if (!operators.includes(calculation_lst[last_idx]) &&
        !scientific_operators.includes(calculation_lst[last_idx])) {
        if (calculation_lst[last_idx].length > 1) {
            if (calculation_lst[last_idx][calculation_lst[last_idx].length - 1] ===
                "." ||
                calculation_lst[last_idx][calculation_lst[last_idx].length - 1] === "/") {
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
    if (calc_mode === "simple") {
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
    var expression = join_lst(calculation_lst);
    result = eval(expression);
    history_lst.push(expression + " = " + String(result));
    update_history();
    calculation_lst = [String(result)];
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
        calculation_lst[last_idx] = String(calculation_lst[last_idx]).slice(0, -1);
    }
    result = join_lst(calculation_lst);
}
function change_calc_mode() {
    if (calc_mode === "simple") {
        calc_mode = "scientific";
    }
    else {
        calc_mode = "simple";
    }
    calculation_lst = [];
    result = "";
    document.getElementById("result").innerText = result;
}
function add_scientific_value(value) {
    if (value === "**" || value == "%") {
        add_operator(value);
    }
    else if (value === "**2") {
        add_operator("**");
        add_digits("2");
    }
    else if (value === "pai") {
        add_digits(String(Math.PI));
    }
    else if (value === "sqrt") {
        add_operator("**");
        add_digits("1/2");
    }
    else if (value === "root") {
        add_operator("**");
        add_digits("1/");
    }
}
function change_remote_mode() {
    if (remote_mode) {
        remote_mode = false;
    }
    else {
        remote_mode = true;
    }
    console.log(remote_mode);
}
function remote_eval() {
    var expression_for_history = join_lst(calculation_lst);
    for (var i = 0; i < calculation_lst.length; i++) {
        if (calculation_lst[i] == "**") {
            calculation_lst[i] = "^";
        }
    }
    var URL = "https://api.mathjs.org/v4/?expr=" +
        encodeURIComponent(join_lst(calculation_lst));
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { return controller.abort(); }, 10);
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
    })["catch"](function (err) {
        if (err.name === "AbortError") {
            alert("2 seconds passed\nSwitch to local mode!");
        }
        else {
            alert(err.msg);
        }
    })["finally"](function () {
        clearTimeout(timeoutId);
    });
}
