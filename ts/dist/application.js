function change_button_background(button) {
    if (document.body.className === "light") {
        if (button.style.backgroundColor === "lightgrey") {
            button.style.backgroundColor = "#FED8B1";
        }
        else {
            button.style.backgroundColor = "lightgrey";
        }
    }
    else {
        if (button.style.backgroundColor === "lightslategray") {
            button.style.backgroundColor = "#FED8B1";
        }
        else {
            button.style.backgroundColor = "lightslategray";
        }
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
function visible_or_hidden(elemnt_id) {
    var el = document.getElementById(elemnt_id);
    if (el.style.visibility === "hidden") {
        el.style.visibility = "visible";
    }
    else {
        el.style.visibility = "hidden";
    }
}
function config() {
    if (window.location.search) {
        var params = new URLSearchParams(window.location.search);
        var background_color = params.get("color");
        var font_family = params.get("font");
        var mode = params.get("mode");
        document.body.style.backgroundColor = background_color;
        document.body.style.fontFamily = font_family;
        var buttons_lst = document.querySelectorAll("button");
        for (var i = 0; i < buttons_lst.length; i++) {
            buttons_lst[i].style.fontFamily = font_family;
        }
        if (mode === "dark") {
            document.body.className = mode;
        }
    }
}
function add_listeners() {
    // calculator events
    var lst_by_content = document.querySelectorAll(".digits, .operators, #eval, #reset, #point");
    var _loop_1 = function (i) {
        lst_by_content[i].addEventListener("click", function () {
            return active_calculator_button(lst_by_content[i].textContent);
        });
    };
    for (var i = 0; i < lst_by_content.length; i++) {
        _loop_1(i);
    }
    var scientific_lst = document.querySelectorAll(".scientific_operators");
    var _loop_2 = function (i) {
        scientific_lst[i].addEventListener("click", function () {
            return active_calculator_button(scientific_lst[i].value);
        });
    };
    for (var i = 0; i < scientific_lst.length; i++) {
        _loop_2(i);
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
    document
        .getElementById("api")
        .addEventListener("click", function () { return change_remote_mode(); });
    // App events
    var id_lst = ["light", "history", "scientific", "api"];
    var _loop_3 = function (button_id) {
        var button_el = document.getElementById(button_id);
        if (document.body.className === "dark") {
            button_el.style.backgroundColor = "lightslategray";
        }
        else {
            button_el.style.backgroundColor = "lightgrey";
        }
        button_el.addEventListener("click", function () {
            return change_button_background(button_el);
        });
    };
    for (var _i = 0, id_lst_1 = id_lst; _i < id_lst_1.length; _i++) {
        var button_id = id_lst_1[_i];
        _loop_3(button_id);
    }
    document.getElementById("result").style.backgroundColor = "lightyellow";
    document
        .getElementById("light")
        .addEventListener("click", function () { return light_button(); });
    document.getElementById("history_panel").style.visibility = "hidden";
    document
        .getElementById("history")
        .addEventListener("click", function () { return visible_or_hidden("history_panel"); });
    document.getElementById("scientific_panel").style.visibility = "hidden";
    document
        .getElementById("scientific")
        .addEventListener("click", function () { return visible_or_hidden("scientific_panel"); });
}
document.addEventListener("DOMContentLoaded", function () {
    config();
    add_listeners();
});
// for pr
