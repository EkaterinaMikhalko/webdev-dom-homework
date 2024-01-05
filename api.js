const apiUrl = "https://wedev-api.sky.pro/api/v2/ekaterina-mikhalko/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";
export let token;
export const setToken = (newToken) => {
  token = newToken;
};

export function fetchPromise() {
  return fetch(apiUrl, {
    metod: "GET"
  })

    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else {
        return response.json();
      }

    });
}

export function postComment({ text, name }) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text: text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      name: name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      //forceError: true,
    }),


  })
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("400 Bad request");
    };
  }).catch((error) => {
    if (error.message === "400 Bad request") {
      alert("Неправильный логин или пароль");
      return;
    };
  });
}