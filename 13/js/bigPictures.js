import {isEscapeKey} from './util.js';
import {morePost} from './api.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComment = document.querySelector('.social__comment-shown-count');
const loaderComments = document.querySelector('.comments-loader');
const urlBigPicture = document.querySelector('.big-picture__img').querySelector('img');
const likesBigPicture = document.querySelector('.likes-count');
const totalCountCommentBigPicture = document.querySelector('.social__comment-total-count');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('.social__comment');
const commentsBigPicture = document.querySelector('.social__comments');

let comments = [];
let indexComment = 0;
const stepComment = 5;

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
  indexComment = 0;
  loaderComments.classList.remove('hidden');
  loaderComments.removeEventListener('click', loadNextComments);
}

function loadNextComments () {
  const drawComments = comments.slice(indexComment, indexComment + stepComment);
  const numberDrawComments = drawComments.length + indexComment;

  const commentListFragment = document.createDocumentFragment();
  drawComments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    commentListFragment.appendChild(commentElement);
  });
  commentsBigPicture.appendChild(commentListFragment);

  countComment.textContent = numberDrawComments;
  totalCountCommentBigPicture.textContent = comments.length;

  indexComment += stepComment;

  if (numberDrawComments >= comments.length) {
    loaderComments.classList.add('hidden');
  }
}

function loadAllComments (pictureDataComments) {
  comments = pictureDataComments;
  loadNextComments();
  loaderComments.addEventListener('click', loadNextComments);
}

export function openBigPicture (photoId) {
  dropComments();
  const pictureData = morePost.find((postData) => postData.id === Number (photoId));
  fillBigPicture(pictureData);
  loadAllComments(pictureData.comments);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  cancelBigPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
}
