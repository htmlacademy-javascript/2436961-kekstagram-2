import {drawPictures} from './thumbnails.js';
import {drawFiltersPosts} from './category.js';

const GET_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const POST_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export let morePosts = [];

fetch(GET_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    morePosts = data;
    drawPictures(morePosts);
  })
  .then (() => {
    drawFiltersPosts(morePosts);
  })
  .catch(() => {
    showErrorMessageForGet();
  });

function showErrorMessageForGet() {
  const errorTemplate = document.querySelector('#data-error');
  const errorElement = errorTemplate.content.cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    const dataErrorElement = document.querySelector('.data-error');
    if (dataErrorElement) {
      dataErrorElement.remove();
    }
  }, 5000);
}

export const sendData = (body) => fetch(
  POST_URL,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error();
  });

export let isErrorMessageOpen = false;

export function showMessageForPost(className) {
  const template = document.querySelector(`#${className}`);
  const element = template.content.cloneNode(true);

  document.body.appendChild(element);
  isErrorMessageOpen = true;

  const message = document.querySelector(`.${className}`);
  const inner = message.querySelector(`.${className}__inner`);
  const closeButton = message.querySelector(`.${className}__button`);

  closeButton.addEventListener('click', removeMessage);
  function removeMessage() {
    message.remove();
    isErrorMessageOpen = false;
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
  function onEscPress(event) {
    if (event.key === 'Escape') {
      removeMessage();
    }
  }
  function onOutsideClick(event) {
    if (!inner.contains(event.target)) {
      removeMessage();
    }
  }
}
