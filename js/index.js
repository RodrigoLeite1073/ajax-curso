import { actionsBtn, getAll, submitBtn } from "./crudA.js";
import { getAllFetch } from "./crudFetch.js";

const d = document,
  $select = d.getElementById("select"),
  miStorage = window.localStorage;

$select.addEventListener("change", (e) => {
  miStorage.setItem("option", e.target.value);
  location.reload();
});

d.addEventListener("DOMContentLoaded", () => {
  let option = miStorage.getItem("option");
  if (option) {
    $select.value = option;
    switch (option) {
      case "Ajax":
        getAll();
        submitBtn();
        actionsBtn();
        break;
      case "Fetch":
        getAllFetch();
        break;
      default:
        break;
    }
  }
});
