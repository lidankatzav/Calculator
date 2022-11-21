function info_button() {
    var info_str = "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
    document
        .getElementById("info")
        .addEventListener("click", function () { return alert(info_str); });
}
function change_background(e) {
    if (document.body.className === "light") {
        e.style.backgroundColor = "orange";
    }
    else {
        e.style.backgroundColor = "lightgrey";
    }
}
function light_button() {
    if (document.body.className === "light") {
        document.body.className = "dark";
        document.body.style.backgroundColor = "darkgray";
    }
    else {
        document.body.className = "light";
        document.body.style.backgroundColor = "white";
    }
}
function add_listeners_2() {
    var lst_by_id = document.querySelectorAll("#light, #history, #scientific, #api");
    var _loop_1 = function (i) {
        lst_by_id[i].addEventListener("click", function () {
            return change_background(lst_by_id[i]);
        });
    };
    for (var i = 0; i < lst_by_id.length; i++) {
        _loop_1(i);
    }
    document
        .getElementById("light")
        .addEventListener("click", function () { return light_button(); });
}
function main_2() {
    info_button();
    add_listeners_2();
}
main_2();
