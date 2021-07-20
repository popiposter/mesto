import Popup from './Popup.js';
import {formData} from '../../scripts/constants.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, handleFormSubmit}) {
    super(popupSelector);

    this._formElement = document.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(formData.inputSelector);

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
      console.log(this._getInputValues());
      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();

    this._formElement.reset();
  }
}
