import { login, setToken, token } from "./api.js";
import { getComments, setUser } from "./main.js"

export const renderLoginStartPage = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `    <div class="container">
    <div class="add-form">
    <h1 class="title">Страница входа</h1>
    <div class="form">
        <h3 class = "form-title">Форма входа</h3>
        <div class="form-row">
            <input  
                type="text" 
                id="login-input"
                class="add-form-name "
                placeholder="Логин"
                >
            <input  
                type="text" 
                id="password-input"
                class="add-form-name "
                placeholder="Пароль"
                >
        </div>
        <br/>
        <button class="add-form-button" id = "login-button">Войти</button>
        <a href="index.html" class="comment-header" id="link-to-comments">Перейти к комментариям</a>
    </div>
</div>
</div>`

    appElement.innerHTML = loginHtml;

    const btnElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    btnElement.addEventListener("click", () => {
        if (loginInputElement.value === '' || passwordInputElement.value === '') {
            alert("Пожалуйста, введите логин и пароль");
            return;
        } else {
            login({
                login: loginInputElement.value,
                password: passwordInputElement.value,
            }).then((responseData) => {
                setToken(responseData.user.token);
                setUser(responseData.user.name);
            }).then(() => {
                getComments();
            });
        }

    })
};



