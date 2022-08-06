const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options;
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(data));
};

export const getAll = () => {
  ajax({
    url: "http://localhost:5555/santos",
    success: (res) => {
      console.log(res);
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".constellation").textContent = el.constelacion;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.nombre;
        $template.querySelector(".edit").dataset.constellation =
          el.constelacion;
        $template.querySelector(".delete").dataset.id = el.id;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.error(err);
      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
  });
};

export const submitBtn = () => {
  d.addEventListener("submit", (e) => {
    if (e.target === $form) {
      e.preventDefault();

      if (!e.target.id.value) {
        ajax({
          url: "http://localhost:5555/santos",
          method: "POST",
          success: (res) => location.reload(),
          error: (err) =>
            $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
          data: {
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          },
        });
      } else {
      }
    }
  });
};

export const actionsBtn = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".edit")) {
      alert("editar");
      $title.textContent = "Editar Santo";
      $form.nombre.value = e.target.dataset.name;
      $form.constelacion.value = e.target.dataset.constellation;
      $form.id.value = e.target.dataset.id;
    } else if (e.target.matches(".delete")) {
    }
  });
};
