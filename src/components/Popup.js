export default class Popup {
  constructor({popupSelector, classPopupOpened, popupCloseSelector}) {
    this._element = document.querySelector(popupSelector);
    this._classPopupOpened = classPopupOpened;
    this._popupCloseSelector = popupCloseSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._element.classList.add(this._classPopupOpened);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.classList.remove(this._classPopupOpened);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element.querySelector(this._popupCloseSelector).addEventListener('click', () => {
      this.close();
    });

    this._element.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}
