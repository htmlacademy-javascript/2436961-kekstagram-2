import {morePosts} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const similarPictures = morePosts();

function createPictureElement (postData) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  image.src = postData.url;
  image.alt = postData.description;
  pictureElement.querySelector('.picture__likes').textContent = postData.likes;
  pictureElement.querySelector('.picture__comments').textContent = postData.comments.length;
  return pictureElement;
}

export function drawPictures() {
  similarPictures.forEach((post) => {
    const picture = createPictureElement(post);
    similarListFragment.appendChild(picture);
  });
  pictureList.appendChild(similarListFragment);
}
