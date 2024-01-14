import { postComment } from "./api.js";
import { getComments } from "./main.js";

export function sendComment() {
    const nameInputElement = document.getElementById('name-input');
    const commentInputElement = document.getElementById('comment-input');
    const buttonElement = document.getElementById('buttonElement');
    const loadingCommentElement = document.getElementById('loadingComment');
    const formElement = document.getElementById('form');
  
    buttonElement.addEventListener("click", () => {
      nameInputElement.style.backgroundColor = "";
      commentInputElement.style.backgroundColor = "";
  
      if (nameInputElement.value === '' && commentInputElement.value === '') {
        nameInputElement.style.backgroundColor = "red";
        commentInputElement.style.backgroundColor = "red";
        return;
      } else
  
  
        if (nameInputElement.value === '') {
          nameInputElement.style.backgroundColor = "red";
          return;
  
        } else
          if (commentInputElement.value === '') {
            commentInputElement.style.backgroundColor = "red";
            return;
          }
  
      loadingCommentElement.style.display = "block";
      formElement.style.display = "none";
  
      postComment({ text: commentInputElement.value, name: nameInputElement.value }).then((response) => {
        if (response.status === 400) {
          throw new Error("Плохой запрос");
        } else if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else {
          formElement.style.display = "flex";
          commentInputElement.value = '';
          nameInputElement.value = '';
          loadingCommentElement.style.display = "none";
          getComments();
        }
      })
        .catch((error) => {
          loadingCommentElement.style.display = "none";
          formElement.style.display = "flex";
          //loadingCommentsElement.style.display = "none";
          if (error.message === "Сервер сломался") {
            alert("Кажется, что-то пошло не так, попробуйте позже")
            return;
          } else if (error.message === "Плохой запрос") {
            alert("Вы ввели менее трех символов в имени или комментарии");
            return;
          } else if (error.message === "Failed to fetch") {
            alert("Пропал интернет, повторите попытку позже");
            return;
          } else {
            alert(error.message);
            return;
          };
        });
    })
  }