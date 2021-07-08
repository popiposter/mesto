import {
  buttonsClosePopup, classPopupAnimated,
  classPopupOpened, formData,
  popupAddCard,
  popupProfile, popups, profileAbout,
  profileInputAbout,
  profileInputName,
  profileTitle
} from './constants.js';

export function openPopup(popup) {
  document.addEventListener('keydown', onKeyDown);

  popup.classList.add(classPopupOpened);
}

function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    handlePopupClose();
  }
}

function getOpenedPopup() {
  return document.querySelector('.' + classPopupOpened);
}

export function closePopup(popup) {
  popup.classList.remove(classPopupOpened);

  document.removeEventListener('keydown', onKeyDown);
}

export const handlePopupClose = () => {
  const openedPopup = getOpenedPopup();
  clearErrorMessages(openedPopup);

  closePopup(openedPopup);
}

export const openProfilePopup = () => {
  setDefaultProfileInputTexts();

  openPopup(popupProfile);
}

export const openAddCardPopup = () => {
  openPopup(popupAddCard);
}

export const setDefaultProfileInputTexts = () => {
  profileInputName.value = profileTitle.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

const clearErrorMessages = (popupElement) => {
  const errorList = popupElement.querySelectorAll(formData.errorSelector);
  const inputList = popupElement.querySelectorAll(formData.inputSelector);

  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove(formData.inputErrorActiveClass);
  });

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(formData.inputErrorClass);
  });
}

export const initPopups = () => {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target === evt.currentTarget) {
          handlePopupClose();
        }
      }
    );
  });

  buttonsClosePopup.forEach(closeBtn => {
    closeBtn.addEventListener('click', handlePopupClose);
  });

  window.addEventListener('load', () => {
    popups.forEach(popup => {
      // Если добавлять сразу в popup.css, при загрузке сраницы запускается transition на visibility.
      popup.classList.add(classPopupAnimated);
    });
  });
}
