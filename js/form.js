import {isEscapeKey} from './util.js';
import {sendData, showSuccessMessageForPost, showErrorMessageForPost} from './api.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const overlayUploadPhoto = document.querySelector('.img-upload__overlay');
const cancelUploadPhoto = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const inputUploadPhoto = formUploadPhoto.querySelector('#upload-file');
const inputHashtagsPhoto = document.querySelector('.text__hashtags');
const inputDescriptionPhoto = document.querySelector('.text__description');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const submitUploadPhoto = document.querySelector('.img-upload__submit');
const controlValue = document.querySelector('.scale__control--value');

const regularForHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (document.activeElement === inputHashtagsPhoto || document.activeElement === inputDescriptionPhoto) {
    evt.stopPropagation();
  } else {
    evt.preventDefault();
    closeOverlayPhoto();
  }
};

function onCloseOverlayPhotoClick() {
  closeOverlayPhoto();
}

function closeOverlayPhoto () {
  overlayUploadPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  inputUploadPhoto.value = '';
  inputHashtagsPhoto.value = '';
  inputDescriptionPhoto.value = '';
  document.querySelector('#effect-none').checked = true;
  controlValue.value = '100%';
  previewPhoto.removeAttribute('style');
  effectLevel.classList.add('hidden');

  cancelUploadPhoto.removeEventListener('click', onCloseOverlayPhotoClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  inputUploadPhoto.addEventListener('change', openOverlayPhoto);
  formUploadPhoto.removeEventListener('submit', onFormSubmit);
}

function openOverlayPhoto () {
  overlayUploadPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelUploadPhoto.addEventListener('click', onCloseOverlayPhotoClick);
  document.addEventListener('keydown', onDocumentKeydown);

  inputUploadPhoto.removeEventListener('change', openOverlayPhoto);
  formUploadPhoto.addEventListener('submit', onFormSubmit);
}

inputUploadPhoto.addEventListener('change', openOverlayPhoto);

// Валидация полей формы

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

function validateHashtag (value) {
  const valueArray = value.trim().toLowerCase().split(' ');
  if (valueArray.length > 5) {
    return false;
  }
  for (let i = 0; i < valueArray.length; i++) {
    if (!regularForHashtag.test(valueArray[i])) {
      return false;
    }
    for (let k = i + 1; k < valueArray.length; k++) {
      if (valueArray[i] === valueArray[k] && i !== k) {
        return false;
      }
    }
  }
  return true;
}

function getErrorMessageHashtag (value) {
  const valueArray = value.trim().toLowerCase().split(' ');
  if (valueArray.length > 5) {
    return 'Превышено количество хэштегов';
  }
  for (let i = 0; i < valueArray.length; i++) {
    if (!regularForHashtag.test(valueArray[i])) {
      return 'Введён невалидный хэштег';
    }
    for (let k = i + 1; k < valueArray.length; k++) {
      if (valueArray[i] === valueArray[k] && i !== k) {
        return 'Хэштеги повторяются';
      }
    }
  }
  return true;
}

pristine.addValidator(inputHashtagsPhoto, validateHashtag, getErrorMessageHashtag);

function validateDescription (value) {
  return !(value.length > 140);
}

pristine.addValidator(inputDescriptionPhoto, validateDescription, 'Длина комментария больше 140 символов');

// Отправка формы

function sendFormPhoto (formElement) {
  const isValid = pristine.validate();
  if (isValid) {
    submitUploadPhoto.disabled = true;
    const formData = new FormData(formElement);
    sendData(formData)
      .then(closeOverlayPhoto)
      .then(() => {
        showSuccessMessageForPost();
      })
      .catch(() => {
        showErrorMessageForPost();
      })
      .finally(() => {
        submitUploadPhoto.disabled = false;
      });
  }
}

function onFormSubmit (evt) {
  evt.preventDefault();
  sendFormPhoto(evt.target);
}

formUploadPhoto.addEventListener('submit', onFormSubmit);
