const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

export const getAllAxios = async () => {
  try {
    let res = await axios.get("http://localhost:5000/santos"),
      json = res.data;

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
      `<p><b> Axios Error ${err.status}: ${message}</b></p>`
    );
  }
};

export const submitBtnAxios = () => {
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
            data: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          };
          res = await axios("http://localhost:5000/santos", options);
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
              data: JSON.stringify({
                nombre: e.target.nombre.value,
                constelacion: e.target.constelacion.value,
              }),
            },
            res = await axios(
              `http://localhost:5000/santos/${e.target.id.value}`,
              options
            );

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

export const actionsBtnAxios = () => {
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

          location.reload();
        } catch (err) {
          const message = err.statusText || "Ocurrio un error";
          alert(`Error ${err.status}: ${message}`);
        }
      }
    }
  });
};
