const effectsList = document.querySelector('.effects__list');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const valueEffect = document.querySelector('.effect-level__value');

noUiSlider.create(sliderEffect, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderEffect.noUiSlider.on('update', () => {
  valueEffect.value = sliderEffect.noUiSlider.get();
});
effectLevel.classList.add('hidden');

function onEffectListChange (evt) {
  const effect = evt.target.value;
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    previewPhoto.removeAttribute('style');
  } else if (effect === 'chrome') {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    valueEffect.value = sliderEffect.noUiSlider.get();
    sliderEffect.noUiSlider.on('update', () => {
      previewPhoto.style.filter = `grayscale(${valueEffect.value})`;
    });
  } else if (effect === 'sepia') {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    sliderEffect.noUiSlider.on('update', () => {
      previewPhoto.style.filter = `sepia(${valueEffect.value})`;
    });
  } else if (effect === 'marvin') {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    sliderEffect.noUiSlider.on('update', () => {
      previewPhoto.style.filter = `invert(${valueEffect.value}%)`;
    });
  } else if (effect === 'phobos') {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    sliderEffect.noUiSlider.on('update', () => {
      previewPhoto.style.filter = `blur(${valueEffect.value}px)`;
    });
  } else if (effect === 'heat') {
    effectLevel.classList.remove('hidden');
    sliderEffect.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    sliderEffect.noUiSlider.on('update', () => {
      previewPhoto.style.filter = `brightness(${valueEffect.value})`;
    });
  }
}

effectsList.addEventListener('change', onEffectListChange);
