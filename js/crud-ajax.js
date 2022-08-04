const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let [url, method, success, error, data] = options;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {});

  xhr.open(method || "GET", url);
};
