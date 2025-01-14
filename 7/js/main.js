import {morePosts} from './data.js';
import {drawPictures} from './thumbnails.js';
import {openBigPicture} from './bigPictures.js';

drawPictures(morePosts);

const thumbnailsList = document.querySelector('.pictures');
thumbnailsList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openBigPicture(evt.target.closest('.picture').dataset.photoId);
  }
});
