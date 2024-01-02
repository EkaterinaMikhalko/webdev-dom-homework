
export function renderLogin ({commentsData}) {
  const appElement = document.getElementById ("app");
    const commentsHtml = commentsData.map ((comment, index) => {
        return `<li class="comment" data-index = "${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
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
        </li>`
      }).join('');

      const appHtml = 
        `<div class="container">
      <ul class="comments" id="comList">${commentsHtml}
      
      </ul>
      <div class="add-form"
      id = "form">
        <input
          type="text"
          class="add-form-name"
          id = "name-input"
          placeholder="Введите ваше имя"
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
      </div>
    </div>`
      

     // const auth = 
     // `<p class = "container">Для добавления клмментария, пожалуйста, авторизуйтесь</p>`
    appElement.innerHTML = appHtml;

}