const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const scaleStep = 0.25;
let scaleValue = 1;

function onSmallerClick () {
  if (scaleValue > scaleStep) {
    scaleValue -= scaleStep;
    previewPhoto.style.transform = `scale(${scaleValue})`;
    controlValue.value = `${scaleValue * 100}%`;
  }
}

function onBiggerClick () {
  if (scaleValue < 1) {
    scaleValue += scaleStep;
    previewPhoto.style.transform = `scale(${scaleValue})`;
    controlValue.value = `${scaleValue * 100}%`;
  }
}

controlSmaller.addEventListener('click', onSmallerClick);
controlBigger.addEventListener('click', onBiggerClick);
