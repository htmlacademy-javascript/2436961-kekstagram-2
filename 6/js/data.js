
import {getRandomInteger} from './util.js';

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Иван',
  'Сергей',
  'Мария',
  'Валерия',
  'Виктор',
  'Юлия',
  'Кристина',
  'Дмитрий',
];

function createComment() {
  let commentId = 1;
  return() => {
    const comment = {};
    comment.id = commentId++;
    comment.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    comment.message = messages[getRandomInteger(0,messages.length - 1)];
    comment.name = names[getRandomInteger(0,names.length - 1)];
    return comment;
  };
}

function moreComments() {
  Array.from({length: getRandomInteger(0,30)}, createComment ());
}

function createPost() {
  let postId = 1;
  return () => {
    const post = {};
    post.id = postId++;
    post.url = `photos/${post.id}.jpg`;
    post.description = `Какова красота на фото ${post.id}`;
    post.likes = getRandomInteger(15, 200);
    post.comments = moreComments ();
    return post;
  };
}

export function morePosts() {
  Array.from({length: 25}, createPost());
}
