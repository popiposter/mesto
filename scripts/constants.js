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
export const popupImageView = document.querySelector(popupImageViewSelector);
export const imageViewCaption = popupImageView.querySelector('.popup__image-caption');
export const imageViewImage = popupImageView.querySelector('.popup__image');

export const popupProfile = document.querySelector('.popup_id_profile');
export const profileForm = popupProfile.querySelector('.popup__form_id_profile');
export const profileInputName = profileForm.querySelector('.popup__form-input_id_profile-name');
export const profileInputAbout = profileForm.querySelector('.popup__form-input_id_profile-about');

export const popupAddCard = document.querySelector('.popup_id_add-card');
export const addCardForm = popupAddCard.querySelector('.popup__form_id_add-card');
export const addCardInputName = addCardForm.querySelector('.popup__form-input_id_add-card-name');
export const addCardInputLink = addCardForm.querySelector('.popup__form-input_id_add-card-link');
export const addCardSaveBtn = addCardForm.querySelector('.popup__button-save_id_add');

export const popups = document.querySelectorAll('.popup');

export const popupCloseSelector = '.popup__button-close';
export const buttonsClosePopup = document.querySelectorAll(popupCloseSelector);

export const profileTitle = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__about');

export const cardListSelector = '.cards__list';
export const cardsList = document.querySelector(cardListSelector);

export const classPopupOpened = 'popup_opened';
export const classCardFavored = 'card__fav-btn_favored';
export const classPopupAnimated = 'popup_animated';
export const classDeleteCardBtn = 'card__delete_btn';
export const classFavCardBtn = 'card__fav-btn';
export const classButtonDisabled = 'popup__button-save_disabled';

export const cardTemplateSelector = '.card-template';

export const formList = Array.from(document.querySelectorAll('.popup__form'));

export const formData = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  inputErrorActiveClass: 'popup__form-input-error_active',
  errorSelector: '.popup__form-input-error'
};
