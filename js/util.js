export function getRandomInteger(a,b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function showListFragment (list, makeElement, container) {
  const fragment = document.createDocumentFragment();
  list.forEach((item) => {
    fragment.appendChild(makeElement(item));
  });
  container.appendChild(fragment);
}

export const isEscapeKey = (evt) => evt.key === 'Escape';
