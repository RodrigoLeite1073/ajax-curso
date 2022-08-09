const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

export const getAllFetch = async () => {
  try {
    let res = await fetch("http://localhost:5000/santos"),
      json = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    }

    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.nombre;
      $template.querySelector(".constellation").textContent = el.constelacion;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.nombre;
      $template.querySelector(".edit").dataset.constellation = el.constelacion;
      $template.querySelector(".delete").dataset.id = el.id;
      $template.querySelector(".delete").dataset.name = el.nombre;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    const message = err.statusText || "Ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`
    );
  }
};

export const submitBtnFetch = () => {
  d.addEventListener("submit", async (e) => {
    if (e.target === $form) {
      e.preventDefault();
      if (!e.target.id.value) {
        try {
          let options = {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value,
              }),
            },
            res = await fetch("http://localhost:5000/santos", options);

          if (!res.ok) {
            throw {
              status: res.status,
              statusText: res.statusText,
            };
          }
          location.reload();
        } catch (err) {
          const message = err.statusText || "Ocurrio un error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message}</b></p>`
          );
        }
      } else {
        try {
          let options = {
              method: "PUT",
              headers: {
                "Content-type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value,
              }),
            },
            res = await fetch(
              `http://localhost:5000/santos/${e.target.id.value}`,
              options
            );

          if (!res.ok) {
            throw {
              status: res.status,
              statusText: res.statusText,
            };
          }
          location.reload();
        } catch (err) {
          const message = err.statusText || "Ocurrio un error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message}</b></p>`
          );
        }
      }
    }
  });
};

export const actionsBtnFetch = () => {
  d.addEventListener("click", async (e) => {
    if (e.target.matches(".edit")) {
      $title.textContent = "Editar Santo";
      $form.nombre.value = e.target.dataset.name;
      $form.constelacion.value = e.target.dataset.constellation;
      $form.id.value = e.target.dataset.id;
    } else if (e.target.matches(".delete")) {
      let isDelete = confirm(
        `¿Seguro quieres borrar a ${e.target.dataset.name}`
      );
      if (isDelete) {
        try {
          let options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=utf-8",
              },
            },
            res = await fetch(
              `http://localhost:5000/santos/${e.target.dataset.id}`,
              options
            );

          if (!res.ok) {
            throw {
              status: res.status,
              statusText: res.statusText,
            };
          }
          location.reload();
        } catch (err) {
          const message = err.statusText || "Ocurrio un error";
          alert(`Error ${err.status}: ${message}`);
        }
      }
    }
  });
};
