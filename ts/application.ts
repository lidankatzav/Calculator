/* function info_button(): void {
  let info_str =
    "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
  document
    .getElementById("info")
    .addEventListener("click", () => alert(info_str));
} */

// let mode: string = "simple";

function change_button_background(button: HTMLElement): void {
  if (document.body.className === "light") {
    if (button.style.backgroundColor === "lightgrey") {
      button.style.backgroundColor = "#FED8B1";
    } else {
      button.style.backgroundColor = "lightgrey";
    }
  } else {
    if (button.style.backgroundColor === "lightslategray") {
      button.style.backgroundColor = "#FED8B1";
    } else {
      button.style.backgroundColor = "lightslategray";
    }
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

function config(): void {
  if (window.location.search) {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    const background_color: string = params.get("color");
    const font_family: string = params.get("font");
    const mode: string = params.get("mode");
    document.body.style.backgroundColor = background_color;
    document.body.style.fontFamily = font_family;
    const buttons_lst = document.querySelectorAll("button");
    for (let i = 0; i < buttons_lst.length; i++) {
      buttons_lst[i].style.fontFamily = font_family;
    }
    if (mode === "dark") {
      document.body.className = mode;
    }
  }
}

function add_listeners(): void {
  // calculator events
  const lst_by_content: NodeList = document.querySelectorAll(
    ".digits, .operators, #eval, #reset, #point"
  );
  for (let i = 0; i < lst_by_content.length; i++) {
    lst_by_content[i].addEventListener("click", () =>
      active_calculator_button(lst_by_content[i].textContent)
    );
  }
  const scientific_lst: any = document.querySelectorAll(
    ".scientific_operators"
  );
  for (let i = 0; i < scientific_lst.length; i++) {
    scientific_lst[i].addEventListener("click", () =>
      active_calculator_button(scientific_lst[i].value)
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
    if (document.body.className === "dark") {
      button_el.style.backgroundColor = "lightslategray";
    } else {
      button_el.style.backgroundColor = "lightgrey";
    }
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
}

document.addEventListener("DOMContentLoaded", () => {
  config();
  add_listeners();
});
