export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const buttonEditProfile = document.querySelector('.profile__edit-info');
export const buttonAddCard = document.querySelector('.profile__add');

export const popupImageViewSelector = '.popup_id_image-view';

export const popupProfileSelector = '.popup_id_profile';
export const profileInputNameElement = document.querySelector('.popup__form-input_id_profile-name');
export const profileInputAboutElement = document.querySelector('.popup__form-input_id_profile-about');

export const popupAddCardSelector = '.popup_id_add-card';

export const popupCloseSelector = '.popup__button-close';

export const profileTitleSelector = '.profile__title';
export const profileAboutSelector = '.profile__about';

export const cardListSelector = '.cards__list';
export const cardsListElement = document.querySelector(cardListSelector);

export const classPopupOpened = 'popup_opened';
export const classCardFavored = 'card__fav-btn_favored';
export const deleteCardSelector = 'card__delete_btn';
export const favCardSelector = 'card__fav-btn';

export const cardTemplateSelector = '.card-template';

export const addCardFormElement = document.querySelector('.popup__form_id_add-card');
export const profileFormElement = document.querySelector('.popup__form_id_profile');

export const getPopupConfig = (popupSelector) => {
  return {
    popupSelector: popupSelector,
    classPopupOpened: classPopupOpened,
    popupCloseSelector: popupCloseSelector
  };
};

export const formData = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  inputErrorActiveClass: 'popup__form-input-error_active',
  errorSelector: '.popup__form-input-error'
};

export const getFormConfig = (formElement) => {
  return {
    formElement: formElement,
    inputSelector: formData.inputSelector
  }
};
