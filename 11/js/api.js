import {drawPictures} from './thumbnails.js';

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

export function showSuccessMessageForPost() {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);

  document.body.appendChild(successElement);

  const successMessage = document.querySelector('.success');
  const successInner = successMessage.querySelector('.success__inner');
  const closeButton = successMessage.querySelector('.success__button');

  closeButton.addEventListener('click', removeSuccessMessage);
  function removeSuccessMessage() {
    successMessage.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
  function onEscPress(event) {
    if (event.key === 'Escape') {
      removeSuccessMessage();
    }
  }
  function onOutsideClick(event) {
    if (!successInner.contains(event.target)) {
      removeSuccessMessage();
    }
  }
}

export function showErrorMessageForPost() {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);

  document.body.appendChild(errorElement);

  const errorMessage = document.querySelector('.error');
  const errorInner = errorMessage.querySelector('.error__inner');
  const closeButton = errorMessage.querySelector('.error__button');

  closeButton.addEventListener('click', removeErrorMessage);
  function removeErrorMessage() {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOutsideClick);
  function onEscPress(event) {
    if (event.key === 'Escape') {
      removeErrorMessage();
    }
  }
  function onOutsideClick(event) {
    if (!errorInner.contains(event.target)) {
      removeErrorMessage();
    }
  }
}
