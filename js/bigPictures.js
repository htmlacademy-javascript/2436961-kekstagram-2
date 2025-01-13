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

export function openBigPicture (photoId) {
  const pictureData = morePosts.find((postData) => postData.id === Number (photoId));

  urlBigPicture.src = pictureData.url;
  urlBigPicture.alt = pictureData.description;
  likesBigPicture.textContent = pictureData.likes;
  totalCountCommentBigPicture.textContent = pictureData.comments.length;
  descriptionBigPicture.textContent = pictureData.description;

  const commentListFragment = document.createDocumentFragment();
  commentsBigPicture.innerHTML = '';
  pictureData.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    commentListFragment.appendChild(commentElement);
  });
  commentsBigPicture.appendChild(commentListFragment);

  countComment.classList.add('hidden');
  loadComment.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
}
