import {morePosts} from './data.js';
import {drawPictures} from './thumbnails.js';
import {thumbnailsList, onOpenBigPictureClick} from './bigPictures.js';

drawPictures(morePosts);
thumbnailsList.addEventListener('click', onOpenBigPictureClick);
