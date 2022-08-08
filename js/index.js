import { actionsBtn, getAll, submitBtn } from "./crudA.js";

const d = document,
  $select = d.getElementById("select"),
  miStorage = window.localStorage;

$select.addEventListener("change", (e) => {
  miStorage.setItem("option", e.target.value);
});

d.addEventListener("DOMContentLoaded", () => {
  getAll();
  submitBtn();
  actionsBtn();

  let option = miStorage.getItem("option");
  if (option) {
    alert(option);
    $select.value = option;
  }
});
