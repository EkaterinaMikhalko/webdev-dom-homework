import { renderLoginStartPage } from "./loginPage.js";
import { commentsData, user } from "./main.js";
import { sendComment } from "./sendComment.js";
import { token } from "./api.js"
import { format } from "date-fns";

export function renderCommentElement() {
  const appElement = document.getElementById("app");
  const commentsHtml = commentsData.map((comment, index) => {
    const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss');
    return `<li class="comment" data-index = "${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${createDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span data-index = "${index}" class="likes-counter">${comment.likes}</span>
              <button data-index = "${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
            </div>
          </div>
        </li>`;
  }).join('');

  function formHtml() {
    if (!token)
      return authButton;
    return `<div class="add-form"
      id = "form">
        <input
          type="text"
          class="add-form-name"
          id = "name-input"
          placeholder="Введите ваше имя"
          value="${user}"
          readonly
        />
        <textarea
          type="textarea"
          class="add-form-text"
          id = "comment-input"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="buttonElement">Написать</button>
        </div>
      </div>`
  }
  

  const authButton = `
      <button class="add-form-button" id="authButton">Чтобы добавить комментарий, авторизуйтесь</button>`

  const appHtml =
    `<ul class="comments" id="comList">${commentsHtml}
      
      </ul>
      ${formHtml()}
      <div class="loadComment" id = "loadingComment">Комментарий добавляется</div>
      `
  appElement.innerHTML = appHtml;

  const renderLogin = () => {
    if (token) return
    const authButtonElement = document.getElementById("authButton");
    authButtonElement.addEventListener('click', () => {
      renderLoginStartPage();
    });

  }
  renderLogin();
}

export function sendAfterAuth () {
  if (token){
    sendComment();
  }
}






