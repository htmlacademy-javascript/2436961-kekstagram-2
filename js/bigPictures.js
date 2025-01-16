import {morePosts} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComment = document.querySelector('.social__comment-count');
const loadComment = document.querySelector('.comments-loader');
const urlBigPicture = document.querySelector('.big-picture__img').querySelector('img');
const likesBigPicture = document.querySelector('.likes-count');
const totalCountCommentBigPicture = document.querySelector('.social__comment-total-count');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('.social__comment');
const commentsBigPicture = document.querySelector('.social__comments');

function onCloseBigPictureClick() {
  closeBigPicture();
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  cancelBigPicture.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function fillBigPicture (array) {
  urlBigPicture.src = array.url;
  urlBigPicture.alt = array.description;
  likesBigPicture.textContent = array.likes;
  totalCountCommentBigPicture.textContent = array.comments.length;
  descriptionBigPicture.textContent = array.description;
}

function dropComments () {
  commentsBigPicture.innerHTML = '';
}

function createComments (array) {
  const commentListFragment = document.createDocumentFragment();
  array.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    commentListFragment.appendChild(commentElement);
  });
  commentsBigPicture.appendChild(commentListFragment);
}

export function openBigPicture (photoId) {
  const pictureData = morePosts.find((postData) => postData.id === Number (photoId));
  fillBigPicture(pictureData);
  dropComments();
  createComments(pictureData);

  countComment.classList.add('hidden');
  loadComment.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
}
