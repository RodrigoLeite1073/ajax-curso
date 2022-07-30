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
      }, 2500);
    } else {
      const message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `<h2>${xhr.status}</h2>
      <h3>${message}</h3>`;
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

(() => {
  const $fetch = document.getElementById("fetch"),
    $loader = document.getElementById("loader"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users", {})
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<h2>${el.name}</h2>
        <h4>${el.phone}</h4>
        <h4>${el.email}</h4>`;
        $fragment.appendChild($li);
      });
      setTimeout(() => {
        $loader.style.display = "none";
        $fetch.appendChild($fragment);
      }, 3500);
    })
    .catch((err) => {
      const message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `<h2>${err.status}</h2>
      <h3>${message}</h3>`;
    });
})();

(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $loader = document.getElementById("loader2"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users", {}),
        json = await res.json();
      if (!res.ok) {
        throw {
          status: res.status,
          statusText: res.statusText,
        };
      }
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<h2>${el.name}</h2>
        <h4>${el.phone}</h4>
        <h4>${el.email}</h4>`;
        $fragment.appendChild($li);
      });
      setTimeout(() => {
        $loader.style.display = "none";
        $fetchAsync.appendChild($fragment);
      }, 3000);
    } catch (err) {
      $loader.style.display = "none";
      const message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `<h2>${err.status}</h2>
      <h3>${message}</h3>`;
    } finally {
    }
  }
  getData();
})();
(() => {
  const $axios = document.getElementById("axios"),
    $loader = document.getElementById("loader3"),
    $fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      let json = res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<h2>${el.name}</h2>
        <h4>${el.phone}</h4>
        <h4>${el.email}</h4>`;
        $fragment.appendChild($li);
      });
      setTimeout(() => {
        $loader.style.display = "none";
        $axios.appendChild($fragment);
      }, 500);
    })
    .catch((err) => {
      const message = err.response.statusText || "Ocurrio un error";
      $loader.style.display = "none";
      $axios.innerHTML = `<h2>${message}</h2>
      <h3>${err.response.status}</h3>`;
    })
    .finally(() => {});
})();
(() => {
  const $axiosAsync = document.getElementById("axios-async-await"),
    $loader = document.getElementById("loader4"),
    $fragment = document.createDocumentFragment();
  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
        json = await res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `<h2>${el.name}</h2>
        <h4>${el.phone}</h4>
        <h4>${el.email}</h4>`;
        $fragment.appendChild($li);
      });
      setTimeout(() => {
        $loader.style.display = "none";
        $axiosAsync.appendChild($fragment);
      }, 500);
    } catch (err) {
      const message = err.response.statusText || "Ocurrio un error";
      $loader.style.display = "none";
      $axiosAsync.innerHTML = `<h2>${message}</h2>
      <h3>${err.response.status}</h3>`;
    } finally {
    }
  }
  getData();
})();
