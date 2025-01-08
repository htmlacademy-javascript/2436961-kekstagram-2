import {morePosts} from './data.js';

const pictures = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const similarPictures = morePosts();

similarPictures.forEach((post) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  image.src = post.url;
  image.alt = post.description;
  pictureElement.querySelector('.picture__likes').textContent = post.likes;
  pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);
