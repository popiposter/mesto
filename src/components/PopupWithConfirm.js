import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector, classPopupOpened, popupCloseSelector}, formElement) {
    super({popupSelector, classPopupOpened, popupCloseSelector});
    this._formElement = formElement;
  }

  setSubmitEventListener(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    this._submitEventListener = this._confirm.bind(this);

    this._formElement.addEventListener('submit', this._submitEventListener);
  }

  _confirm(evt) {
    evt.preventDefault();

    this._handleFormSubmit();

    this._formElement.removeEventListener('submit', this._submitEventListener);
  }
}
