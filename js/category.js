import {drawPictures} from './thumbnails.js';
import {debounce, clearAllPosts} from './util.js';

const filtersPost = document.querySelector('.img-filters');
let pictures = [];
const RERENDER_DELAY = 500;
const filters = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => pictures.slice().sort(() => 0.5 - Math.random()).slice(0, 10),
  'filter-discussed': () => pictures.slice().sort((a, b) => b.comments.length - a.comments.length),
};

export function drawFiltersPosts (postData) {
  filtersPost.classList.remove('img-filters--inactive');
  filtersPost.addEventListener('mouseup', onFilterPostMouseup);
  filtersPost.addEventListener('click', debounce(onFilterPostClick, RERENDER_DELAY));
  pictures = postData;
}

function onFilterPostMouseup(evt) {
  const targetButton = evt.target.closest('.img-filters__button');
  const activeButton = document.querySelector('.img-filters__button--active');
  if (targetButton === activeButton) {
    return;
  }
  if (targetButton) {
    activeButton.classList.remove('img-filters__button--active');
    targetButton.classList.add('img-filters__button--active');
  }
}

function onFilterPostClick(evt) {
  const targetButton = evt.target.closest('.img-filters__button');
  if (!targetButton) {
    return;
  }
  clearAllPosts();
  loadPost(targetButton);
}

function loadPost(targetButton) {
  const filterFunction = filters[targetButton.id];
  const filteredPosts = filterFunction();
  drawPictures(filteredPosts);
}
