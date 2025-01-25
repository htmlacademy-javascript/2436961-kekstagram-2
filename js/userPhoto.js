const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];

const inputFile = document.querySelector('.img-upload__start input[type=file]');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const previewEffects = document.querySelectorAll('.effects__preview');

inputFile.addEventListener('change', () => {
  const photo = inputFile.files[0];
  const photoName = photo.name.toLowerCase();
  const matches = PHOTO_TYPES.some((item) => photoName.endsWith(item));
  if (matches) {
    previewPhoto.src = URL.createObjectURL(photo);
    previewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(photo)})`;
    });
  }
});
