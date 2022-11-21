// Global vars
var current_val = undefined;
var operand_1 = "";
var operator = "";
var operand_2 = "";
var result = "";
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
    else {
        add_operator(value);
    }
    document.getElementById("result").innerText = result;
}
function add_digits(value) {
    if (operator === "") {
        operand_1 += value;
        result = operand_1;
    }
    else {
        operand_2 += value;
        result = operand_1 + " " + operator + " " + operand_2;
    }
}
function add_operator(value) {
    if (operand_1 !== "" && operand_2 !== "") {
        operand_1 = eval(parseFloat(operand_1), operator, parseFloat(operand_2));
        operand_2 = "";
    }
    operator = value;
    result = operand_1 + " " + operator;
}
function calculate() {
    result = eval(parseFloat(operand_1), operator, parseFloat(operand_2));
    operand_1 = result;
    operand_2 = "";
    operator = "";
}
function reset() {
    operand_1 = "";
    operand_2 = "";
    operator = "";
    result = "";
}
function add_point() {
    if (operand_2 === "") {
        operand_1 += ".";
        result = operand_1;
    }
    else {
        operand_2 += ".";
        result = operand_1 + " " + operator + " " + operand_2;
    }
}
function plus_minus() {
    if (operand_2 === "") {
        if (operand_1[0] === "-") {
            operand_1 = operand_1.slice(1);
        }
        else {
            operand_1 = "-" + operand_1;
        }
        result = operand_1;
    }
    else {
        if (operand_2[0] === "-") {
            operand_2 = operand_2.slice(1);
        }
        else {
            operand_2 = "-" + operand_2;
        }
        result = operand_1 + " " + operator + " " + operand_2;
    }
}
function erase() {
    if (operand_2 === "" && operator === "") {
        operand_1 = operand_1.slice(0, -1);
        result = operand_1;
    }
    else if (operand_2 === "") {
        operator = "";
        result = operand_1;
    }
    else {
        operand_2 = operand_2.slice(0, -1);
        result = operand_1 + " " + operator + " " + operand_2;
    }
}
function add_listeners() {
    var lst_by_text = document.querySelectorAll(".digits, .operators, #eval, #reset, #point");
    var _loop_1 = function (i) {
        lst_by_text[i].addEventListener("click", function () {
            return active_button(lst_by_text[i].textContent);
        });
    };
    for (var i = 0; i < lst_by_text.length; i++) {
        _loop_1(i);
    }
    document
        .getElementById("erase")
        .addEventListener("click", function () { return active_button("erase"); });
    document
        .getElementById("pm")
        .addEventListener("click", function () { return active_button("pm"); });
}
function main() {
    add_listeners();
}
main();
