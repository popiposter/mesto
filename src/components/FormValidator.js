export default class FormValidator {
  constructor(formData, formElement) {
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._inputErrorActiveClass = formData.inputErrorActiveClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorActiveClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._inputErrorActiveClass);
    errorElement.textContent = '';
  };

  _getErrorElement = (inputElement) => {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = (buttonElement) => {
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setValidationEventListeners = () => {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(buttonElement);

    const thisObj = this;

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        thisObj._checkInputValidity(inputElement);
        thisObj._toggleButtonState(buttonElement);
      });
    });
  }

  enableValidation() {
    const thisObj = this;

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

      // При нажатии Enter нужно запретить submit невалидной формы.
      if (thisObj._hasInvalidInput(thisObj._inputList)) {
        evt.stopImmediatePropagation();
      }
    });

    this._setValidationEventListeners();
  }
}
