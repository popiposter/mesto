import './index.css';

import {
  addCardFormElement,
  buttonAddCard,
  buttonEditProfile,
  cardListSelector,
  cardTemplateSelector,
  formData,
  getFormConfig,
  getPopupConfig,
  popupAddCardSelector,
  popupImageViewSelector,
  popupProfileSelector,
  profileAboutSelector,
  profileFormElement,
  profileInputAboutElement,
  profileInputNameElement,
  profileTitleSelector,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  token: '568f90d1-38c3-4e48-946b-3689db798031'
});

const openFormPopup = (popup, formValidator) => {
  formValidator.toggleButtonState();
  formValidator.resetErrors();

  popup.open();
};

// Карточки.
const cardPopup = new PopupWithImage(getPopupConfig(popupImageViewSelector));
cardPopup.setEventListeners();

const createCardElement = (data) => {
  const card = new Card({
    data,
    handleCardClick: (data) => {
      cardPopup.open(data);
    }
  }, cardTemplateSelector);

  return card.generateCard();
};

const cardList = new Section({
  renderer: (item) => {
    const newCard = createCardElement(item);
    cardList.addItem(newCard);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm(
  getPopupConfig(popupAddCardSelector),
  getFormConfig(addCardFormElement),
  (data) => {
    const newCard = createCardElement(data);
    cardList.prependItem(newCard);

    addCardPopup.close();
  }
)

const addCardFormValidator = new FormValidator(formData, addCardFormElement);
addCardFormValidator.enableValidation();

buttonAddCard.addEventListener('click', () => {
  openFormPopup(addCardPopup, addCardFormValidator);
});

addCardPopup.setEventListeners();

// Профиль.
const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  aboutSelector: profileAboutSelector
});

const setDefaultUserInfo = () => {
  const userData = userInfo.getUserInfo();
  profileInputNameElement.value = userData.name;
  profileInputAboutElement.value = userData.about;
};

const profilePopup = new PopupWithForm(
  getPopupConfig(popupProfileSelector),
  getFormConfig(profileFormElement),
  (data) => {
    userInfo.setUserInfo(data);

    profilePopup.close();
  }
);

const profileFormValidator = new FormValidator(formData, profileFormElement);
profileFormValidator.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  setDefaultUserInfo();
  openFormPopup(profilePopup, profileFormValidator);
});

profilePopup.setEventListeners();

api.getInitialCards().then(res => {
  cardList.renderItems(res);
})
  .catch(err => {
    console.log(err);
  })

// cardList.renderItems(initialCards);

setDefaultUserInfo();




