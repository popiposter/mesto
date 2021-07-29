import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, classPopupOpened, popupCloseSelector, saveBtnText},
              {formElement, inputSelector},
              handleFormSubmit) {
    super({popupSelector, classPopupOpened, popupCloseSelector});

    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(inputSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._saveBtnText = saveBtnText;
    this._saveButtonElement = this._formElement.querySelector('.popup__button-save');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  setSaveButtonText(text) {
    this._saveButtonElement.textContent = text;
  }

  resetSaveButtonText() {
    this._saveButtonElement.textContent = this._saveBtnText;
  }

  close() {
    super.close();

    this._formElement.reset();
  }
}
