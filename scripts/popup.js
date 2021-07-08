import {classPopupOpened} from './constants.js';

export function openPopup(popup) {
  document.addEventListener('keydown', onKeyDown);

  popup.classList.add(classPopupOpened);
}

function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.' + classPopupOpened);

    closePopup(openedPopup);
  }
}

export function closePopup(popup) {
  popup.classList.remove(classPopupOpened);

  document.removeEventListener('keydown', onKeyDown);
}
