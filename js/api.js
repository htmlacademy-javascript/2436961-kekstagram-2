import {drawPictures} from './thumbnails.js';
import {drawFiltersPosts} from './category.js';

export let morePost = [];

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    morePost = data;
    drawPictures(morePost);
  })
  .then (() => {
    drawFiltersPosts(morePost);
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
  'https://31.javascript.htmlacademy.pro/kekstagram',
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
