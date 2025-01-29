const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const SCALE_STEP = 0.25;
let SCALE_VALUE = 1;

function onSmallerClick () {
  if (SCALE_VALUE > SCALE_STEP) {
    SCALE_VALUE -= SCALE_STEP;
    previewPhoto.style.transform = `scale(${SCALE_VALUE})`;
    controlValue.value = `${SCALE_VALUE * 100}%`;
  }
}

function onBiggerClick () {
  if (SCALE_VALUE < 1) {
    SCALE_VALUE += SCALE_STEP;
    previewPhoto.style.transform = `scale(${SCALE_VALUE})`;
    controlValue.value = `${SCALE_VALUE * 100}%`;
  }
}

controlSmaller.addEventListener('click', onSmallerClick);
controlBigger.addEventListener('click', onBiggerClick);
