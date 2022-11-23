/* function info_button(): void {
  let info_str =
    "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
  document
    .getElementById("info")
    .addEventListener("click", () => alert(info_str));
} */

// let mode: string = "simple";

function change_button_background(button: HTMLElement): void {
  if (button.style.backgroundColor === "lightgrey") {
    button.style.backgroundColor = "#FED8B1";
  } else {
    button.style.backgroundColor = "lightgrey";
  }
}

function light_button(): void {
  const result_div: HTMLElement = document.getElementById("result");
  if (result_div.style.backgroundColor === "lightyellow") {
    result_div.style.backgroundColor = "yellow";
  } else {
    result_div.style.backgroundColor = "lightyellow";
  }
}

function visible_or_hidden(elemnt_id: string): void {
  const el: HTMLElement = document.getElementById(elemnt_id);
  if (el.style.visibility === "hidden") {
    el.style.visibility = "visible";
  } else {
    el.style.visibility = "hidden";
  }
}

function get_values() {
  console.log("hi");
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("font");
  console.log(myParam);
}

function add_listeners(): void {
  // calculator events
  const check_by_content: NodeList = document.querySelectorAll(
    ".digits, .operators, #eval, #reset, #point"
  );
  for (let i = 0; i < check_by_content.length; i++) {
    check_by_content[i].addEventListener("click", () =>
      active_calculator_button(check_by_content[i].textContent)
    );
  }
  document
    .getElementById("erase")
    .addEventListener("click", () => active_calculator_button("erase"));
  document
    .getElementById("pm")
    .addEventListener("click", () => active_calculator_button("pm"));
  document.getElementById("scientific").addEventListener("click", () => {
    change_calc_mode();
  });

  // App events
  const id_lst: string[] = ["light", "history", "scientific", "api"];
  for (const button_id of id_lst) {
    const button_el: HTMLElement = document.getElementById(button_id);
    button_el.style.backgroundColor = "lightgrey";
    button_el.addEventListener("click", () =>
      change_button_background(button_el)
    );
  }
  document.getElementById("result").style.backgroundColor = "lightyellow";
  document
    .getElementById("light")
    .addEventListener("click", () => light_button());
  document.getElementById("history_panel").style.visibility = "hidden";
  document
    .getElementById("history")
    .addEventListener("click", () => visible_or_hidden("history_panel"));
  document.getElementById("scientific_panel").style.visibility = "hidden";
  document
    .getElementById("scientific")
    .addEventListener("click", () => visible_or_hidden("scientific_panel"));

  const url = new URL("config.html");
  console.log(url.searchParams.get("font"));
}

document.addEventListener("DOMContentLoaded", () => add_listeners());
