import { actionsBtn, getAll, submitBtn } from "./crudA.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  getAll();
  submitBtn();
  actionsBtn();
});
