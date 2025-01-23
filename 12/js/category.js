import {drawPictures} from './thumbnails.js';
import {debounce} from './util.js';

const filtersPost = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
let pictures = [];
const RERENDER_DELAY = 500;

export function drawFiltersPosts (postData) {
  filtersPost.classList.remove('img-filters--inactive');
  filtersPost.addEventListener('click', debounce(onFilterPostClick, RERENDER_DELAY));
  pictures = postData;
}

function onFilterPostClick(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');
  if (targetButton === activeButton) {
    return;
  }
  if (targetButton) {
    document.querySelectorAll('.picture').forEach((item) => {
      item.remove();
    });
    activeButton.classList.remove('img-filters__button--active');
    targetButton.classList.add('img-filters__button--active');
    loadPost(targetButton);
  }
}

function loadPost(targetButton) {
  let filteredPosts = [];
  if (targetButton === defaultFilter) {
    filteredPosts = pictures.slice();
  } else if (targetButton === randomFilter) {
    filteredPosts = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, 10);
  } else if (targetButton === discussedFilter) {
    filteredPosts = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
  drawPictures(filteredPosts);
}
