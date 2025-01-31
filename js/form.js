import {isEscapeKey} from './util.js';
import {sendData, showMessageForPost, isErrorMessageOpen} from './api.js';
import {body} from './bigPictures.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const overlayUploadPhoto = document.querySelector('.img-upload__overlay');
const cancelUploadPhoto = document.querySelector('.img-upload__cancel');
const inputUploadPhoto = formUploadPhoto.querySelector('#upload-file');
const inputHashtagsPhoto = document.querySelector('.text__hashtags');
const inputDescriptionPhoto = document.querySelector('.text__description');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectNone = document.querySelector('#effect-none');
const submitUploadPhoto = document.querySelector('.img-upload__submit');
const controlValue = document.querySelector('.scale__control--value');
const REGULAR_FOR_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!isErrorMessageOpen) {
      if (document.activeElement === inputHashtagsPhoto || document.activeElement === inputDescriptionPhoto) {
        evt.stopPropagation();
      } else {
        evt.preventDefault();
        closeOverlayPhoto();
      }
    } else {
      evt.preventDefault();
    }
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
  effectNone.checked = true;
  controlValue.value = '100%';
  previewPhoto.removeAttribute('style');
  effectLevel.classList.add('hidden');
  pristine.reset();

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

function validateHashtag (value) {
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return true;
  }
  const valueArray = value.trim().toLowerCase().split(' ');
  if (valueArray.length > 5) {
    return false;
  }
  for (let i = 0; i < valueArray.length; i++) {
    if (!REGULAR_FOR_HASHTAG.test(valueArray[i])) {
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
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return true;
  }
  const valueArray = value.trim().toLowerCase().split(' ');
  if (valueArray.length > 5) {
    return 'Превышено количество хэштегов';
  }
  for (let i = 0; i < valueArray.length; i++) {
    if (!REGULAR_FOR_HASHTAG.test(valueArray[i])) {
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
        showMessageForPost('success');
      })
      .catch(() => {
        showMessageForPost('error');
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
