import {classPopupOpened, popupCloseSelector} from '../../scripts/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.add(classPopupOpened);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.remove(classPopupOpened);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector(popupCloseSelector).addEventListener('click', () => {
      this.close();
    });

    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}
