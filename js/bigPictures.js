import {morePosts} from './data.js';
import {isEscapeKey} from './util.js';

export const thumbnailsList = document.querySelector('.pictures');
const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const countComment = document.querySelector('.social__comment-count');
const loadComment = document.querySelector('.comments-loader');
const urlBigPicture = document.querySelector('.big-picture__img');
const likesBigPicture = document.querySelector('.likes-count');
const totalCountCommentBigPicture = document.querySelector('.social__comment-total-count');
const descriptionBigPicture = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('.social__comment');
const commentsBigPicture = document.querySelector('.social__comments');

function drawBigPictures ({url, description, likes, comments}) {
  urlBigPicture.src = url;
  urlBigPicture.alt = description;
  likesBigPicture.textContent = likes;
  totalCountCommentBigPicture.textContent = comments.length;
  descriptionBigPicture.textContent = description;
}

function createComment ({avatar, name, message}) {
  const commentElement = commentTemplate.cloneNode(true);
  const commentAvatar = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;
  return commentElement;
}

function drawComments (comments) {
  commentsBigPicture.innerHTML = '';
  const commentListFragment = document.createDocumentFragment();
  comments.forEach((commentData) => {
    const comment = createComment(commentData);
    commentListFragment.appendChild(comment);
  });
  commentsBigPicture.appendChild(commentListFragment);
}

function changePicture(element, posts) {
  for (let i = 0; i < thumbnails.length; i++) {
    if (element === thumbnails[i]) {
      drawBigPictures(posts[i]);
      drawComments(posts[i].comments);
    }
  }
}

function openBigPictures () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  countComment.classList.add('hidden');
  loadComment.classList.add('hidden');
}

function closeBigPictures () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (!isEscapeKey(evt)) {
    return;
  }
  onCloseBigPictureClick();
};

export function onOpenBigPictureClick(evt) {
  if (evt.target.closest('.picture')) {
    openBigPictures();
    changePicture(evt.target.closest('.picture'), morePosts);
    closeBigPicture.addEventListener('click', onCloseBigPictureClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function onCloseBigPictureClick() {
  closeBigPictures();
  closeBigPicture.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

thumbnailsList.addEventListener('click', onOpenBigPictureClick);
