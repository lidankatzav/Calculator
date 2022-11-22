/* function info_button(): void {
  let info_str =
    "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
  document
    .getElementById("info")
    .addEventListener("click", () => alert(info_str));
} */
// let mode: string = "simple";
function change_button_background(button) {
    if (button.style.backgroundColor === "lightgrey") {
        button.style.backgroundColor = "orange";
    }
    else {
        button.style.backgroundColor = "lightgrey";
    }
}
function light_button() {
    var result_div = document.getElementById("result");
    if (result_div.style.backgroundColor === "lightyellow") {
        result_div.style.backgroundColor = "yellow";
    }
    else {
        result_div.style.backgroundColor = "lightyellow";
    }
}
function add_listeners() {
    // calculator events
    var check_by_content = document.querySelectorAll(".digits, .operators, #eval, #reset, #point");
    var _loop_1 = function (i) {
        check_by_content[i].addEventListener("click", function () {
            return active_calculator_button(check_by_content[i].textContent);
        });
    };
    for (var i = 0; i < check_by_content.length; i++) {
        _loop_1(i);
    }
    document
        .getElementById("erase")
        .addEventListener("click", function () { return active_calculator_button("erase"); });
    document
        .getElementById("pm")
        .addEventListener("click", function () { return active_calculator_button("pm"); });
    document.getElementById("scientific").addEventListener("click", function () {
        change_calc_mode();
    });
    // App events
    var id_lst = ["light", "history", "scientific", "api"];
    var _loop_2 = function (button_id) {
        var button_el = document.getElementById(button_id);
        button_el.style.backgroundColor = "lightgrey";
        button_el.addEventListener("click", function () {
            return change_button_background(button_el);
        });
    };
    for (var _i = 0, id_lst_1 = id_lst; _i < id_lst_1.length; _i++) {
        var button_id = id_lst_1[_i];
        _loop_2(button_id);
    }
    document.getElementById("result").style.backgroundColor = "lightyellow";
    document
        .getElementById("light")
        .addEventListener("click", function () { return light_button(); });
}
document.addEventListener("DOMContentLoaded", function () { return add_listeners(); });