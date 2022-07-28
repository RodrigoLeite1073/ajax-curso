(() => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) {
      $xhr.innerHTML = `<h2>CARGANDO...</h2>`;
      return;
    }
    if (xhr.status >= 200 && xhr.status < 300) {
      //console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<h2>${el.name}</h2>
        <h4>${el.phone}</h4>
        <h4>${el.email}</h4>`;
        $fragment.appendChild($li);
      });
      setTimeout(() => {
        $xhr.innerHTML = "";
        $xhr.appendChild($fragment);
      }, 3000);
    } else {
      console.log("error");
      const meessage = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `<h2>${xhr.status}</h2>
      <h3>${meessage}</h3>`;
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();
