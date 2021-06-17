const showInputError = (formElement, inputElement, errorMessage, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formData.inputErrorActiveClass);
};

const hideInputError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.inputErrorActiveClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formData);
  } else {
    hideInputError(formElement, inputElement, formData);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formData.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(formData.inactiveButtonClass);
  }
};

const setValidationEventListeners = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formData);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formData);
      toggleButtonState(inputList, buttonElement, formData);
    });
  });
}

const enableValidation = (formData) => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setValidationEventListeners(formElement, formData);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  inputErrorActiveClass: 'popup__form-input-error_active',
  errorClass: 'popup__form-input-error'
});
