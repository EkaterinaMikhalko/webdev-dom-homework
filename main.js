import { fetchPromise } from "./api.js"
import { renderCommentElement, sendAfterAuth } from "./render.js"

export let user
export const setUser = (newUser) => {
  user = newUser
}
export const getComments = () => {
  fetchPromise()
    .then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: comment.date,
          text: comment.text,
          likes: 0,
        }
      })
      commentsData = appComments
      renderComments()
      //const loadingCommentElement = getElementById("loadingComment");
      //console.log (loadingCommentElement);
      //loadingCommentElement.style.display = 'none';
    })

    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Кажется, что-то пошло не так, попробуйте позже")
        return
      } else if (error.message === "Failed to fetch") {
        alert("Пропал интернет, повторите попытку позже")
        return
      } else {
        console.warn(error)
      }
    })
}

// getComments();

/*function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  let hh = date.getHours();
  let min = date.getMinutes();

  return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;

}

let commentDate = formatDate(new Date);
*/

export let commentsData = []

const initEventListener = () => {
  const likesButtonElement = document.querySelectorAll(".like-button")
  for (const likeButtonElement of likesButtonElement) {
    const index = likeButtonElement.dataset.index
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation()
      if (commentsData[index].isLiked === true) {
        commentsData[index].likes--
        commentsData[index].isLiked = false
      } else {
        commentsData[index].likes++
        commentsData[index].isLiked = true
      }
      renderComments()
    })
  }
}

const renderComments = () => {
  renderCommentElement()
  initEventListener()
  replyComments()
  sendAfterAuth()
}

const replyComments = () => {
  const quoteElements = document.querySelectorAll(".comment")
  for (const quoteElement of quoteElements) {
    const index = quoteElement.dataset.index
    quoteElement.addEventListener("click", () => {
      let commentAnswer = document.querySelector(".add-form-text")
      commentAnswer.value = `${commentsData[index].text}: ${commentsData[index].name}`
    })
  }
}
replyComments()
renderComments()

getComments()
