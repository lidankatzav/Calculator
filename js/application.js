function info_button() {
  let info_str =
    "Developer: Lidan Katzav \nCalculator’s Version: v1.0 \nDescription: Simple scientific calculator built using HTML, CSS & JS.";
  document
    .getElementById("info")
    .addEventListener("click", () => alert(info_str));
}

function change_background(e) {
  if (document.body.className === "light") {
    e.style.backgroundColor = "orange";
  } else {
    e.style.backgroundColor = "lightgrey";
  }
}

function light_button() {
  if (document.body.className === "light") {
    document.body.className = "dark";
    document.body.style.backgroundColor = "darkgray";
  } else {
    document.body.className = "light";
    document.body.style.backgroundColor = "white";
  }
}

function add_listeners() {
  const lst_by_id = document.querySelectorAll(
    "#light, #history, #scientific, #api"
  );
  for (let i = 0; i < lst_by_id.length; i++) {
    lst_by_id[i].addEventListener("click", () =>
      change_background(lst_by_id[i])
    );
  }
  document
    .getElementById("light")
    .addEventListener("click", () => light_button());
}

function main() {
  info_button();
  add_listeners();
}

main();
