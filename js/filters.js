const effectsList = document.querySelector('.effects__list');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const sliderEffect = document.querySelector('.effect-level__slider');
const valueEffect = document.querySelector('.effect-level__value');

const EFFECT_SETTINGS = {
  none: {
    hidden: true,
    filter: null,
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`
  }
};

noUiSlider.create(sliderEffect, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

effectLevel.classList.add('hidden');

function onEffectListChange (evt) {
  const effect = evt.target.value;
  const settings = EFFECT_SETTINGS[effect];

  if (settings.hidden) {
    effectLevel.classList.add('hidden');
    previewPhoto.removeAttribute('style');
    return;
  }

  effectLevel.classList.remove('hidden');
  sliderEffect.noUiSlider.updateOptions({
    range: settings.range,
    start: settings.start,
    step: settings.step,
  });

  sliderEffect.noUiSlider.on('update', () => {
    const value = sliderEffect.noUiSlider.get();
    valueEffect.value = parseFloat(value).toFixed(1);
    previewPhoto.style.filter = settings.filter(valueEffect.value);
  });
}

effectsList.addEventListener('change', onEffectListChange);
