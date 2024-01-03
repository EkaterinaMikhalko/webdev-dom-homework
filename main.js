import {fetchPromise, postComment}  from './api.js';
import {renderCommentElement} from './render.js';

  

    const getComments = () => {

    fetchPromise().then((responseData) => {
    let appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: 0,
      };
    })
     commentsData = appComments;
     renderComments();
     //const loadingCommentElement = getElementById("loadingComment");
     //console.log (loadingCommentElement);
     //loadingCommentElement.style.display = 'none';

  })
    
    .catch ((error) => {

      if (error.message === "Сервер сломался") {
        alert ("Кажется, что-то пошло не так, попробуйте позже")
        return;
      } else if (error.message === "Failed to fetch") {
        alert ("Пропал интернет, повторите попытку позже");
      return;
    } else {
      console.warn (error);
        }
    })
};

   // getComments();


   

    function formatDate(date) {

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

    let commentDate = formatDate (new Date);

    export let commentsData = []


    const initEventListener = () => {
        const likesButtonElement = document.querySelectorAll (".like-button");
        for (const likeButtonElement of likesButtonElement){
          const index = likeButtonElement.dataset.index;
          likeButtonElement.addEventListener ("click", (event)=> {
            event.stopPropagation();
            if (commentsData[index].isLiked === true) {
              commentsData[index].likes --;
              commentsData[index].isLiked = false;
            } else {
              commentsData[index].likes ++;
              commentsData[index].isLiked = true;
            }
            renderComments();
          });
        }
    };
    

    const renderComments = () => {
    renderCommentElement();
    initEventListener();
    replyComments();
    sendComment();
    }

    

    const replyComments = () => {
      const quoteElements = document.querySelectorAll(".comment");
      for (const quoteElement of quoteElements){
        const index = quoteElement.dataset.index;
        quoteElement.addEventListener ("click", ()=> {
          let commentAnswer = document.querySelector('.add-form-text');
          commentAnswer.value = `${commentsData[index].text}: ${commentsData[index].name}`;  

        })

      }

    } 
    replyComments();
    renderComments();

    function sendComment () {
      const loadingCommentsElement = document.getElementById ('loadingComments')
      const nameInputElement = document.getElementById ('name-input');
      const commentInputElement = document.getElementById ('comment-input');
      const buttonElement = document.getElementById ('buttonElement');
      const loadingCommentElement = document.getElementById('loadingComment');
      const formElement = document.getElementById('form');
      
      buttonElement.addEventListener ("click", ()=>{
        nameInputElement.style.backgroundColor = "";
        commentInputElement.style.backgroundColor = "";
  
        if (nameInputElement.value === '' && commentInputElement.value === ''){
          nameInputElement.style.backgroundColor = "red";
          commentInputElement.style.backgroundColor = "red";
          return;
        } else
  
  
        if (nameInputElement.value === '') {
             nameInputElement.style.backgroundColor = "red";
             return;
          
         } else  
          if (commentInputElement.value === ''){
           commentInputElement.style.backgroundColor = "red";
            return;
          }
  
        loadingCommentElement.style.display = "block";
        formElement.style.display = "none";

        postComment({text: commentInputElement.value, name: nameInputElement.value}).then ((response) =>{
          if (response.status === 400) {
            throw new Error ("Плохой запрос");
          } else if(response.status === 500){
            throw new Error ("Сервер сломался");
          } else {
            formElement.style.display ="flex";
            commentInputElement.value='';
            nameInputElement.value='';
          loadingCommentElement.style.display = "none" ;
        getComments();
            }
        })
        .catch ((error) => {
          loadingCommentElement.style.display = "none";
          formElement.style.display = "flex";
          loadingCommentsElement.style.display = "none";
          if (error.message === "Сервер сломался") {
            alert ("Кажется, что-то пошло не так, попробуйте позже")
            return;
          } else  if (error.message === "Плохой запрос"){
            alert ("Вы ввели менее трех символов в имени или комментарии");
            return;
          } else if (error.message === "Failed to fetch") {
            alert ("Пропал интернет, повторите попытку позже");
            return;
          } else {
          alert (error.message);
          return;
          };
        });
        })
      }
        getComments();
        

