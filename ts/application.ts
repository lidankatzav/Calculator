/* function info_button(): void {
  let info_str =
    "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
  document
    .getElementById("info")
    .addEventListener("click", () => alert(info_str));
} */

function change_button_background(button: HTMLElement): void {
  if (button.style.backgroundColor === "lightgrey") {
    button.style.backgroundColor = "orange";
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

function add_listeners_2(): void {
  const id_lst: string[] = ["light", "history", "scientific", "api"];
  for (const button_id of id_lst) {
    const button_el = document.getElementById(button_id);
    button_el.addEventListener("click", () =>
      change_button_background(button_el)
    );
  }
  document
    .getElementById("light")
    .addEventListener("click", () => light_button());
}

function main_2(): void {
  // info_button();
  add_listeners_2();
}

main_2();
