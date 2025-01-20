import {morePosts} from './data.js';
import {openBigPicture} from './bigPictures.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

function createPictureElement (postData) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.dataset.photoId = postData.id;
  const image = pictureElement.querySelector('.picture__img');
  image.src = postData.url;
  image.alt = postData.description;
  pictureElement.querySelector('.picture__likes').textContent = postData.likes;
  pictureElement.querySelector('.picture__comments').textContent = postData.comments.length;
  return pictureElement;
}

function onPictureListClick(evt) {
  const card = evt.target.closest('.picture');
  if (!card) return;

  openBigPicture(card.dataset.photoId);
}

export function drawPictures() {
  morePosts.forEach((post) => {
    const picture = createPictureElement(post);
    similarListFragment.appendChild(picture);
  });
  pictureList.appendChild(similarListFragment);
  pictureList.addEventListener('click', onPictureListClick);
}
