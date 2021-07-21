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
  initialCards,
  popupAddCardSelector,
  popupImageViewSelector,
  popupProfileSelector,
  profileAboutSelector,
  profileFormElement,
  profileInputAboutElement,
  profileInputNameElement,
  profileTitleSelector,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const openFormPopup = (popup, formValidator) => {
  formValidator.toggleButtonState();
  formValidator.resetErrors();

  popup.open();
};

// Карточки.
const cardPopup = new PopupWithImage(getPopupConfig(popupImageViewSelector));
cardPopup.setEventListeners();

const addCard = (data, cards) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      cardPopup.open(data);
    }
  }, cardTemplateSelector);
  const cardElement = card.generateCard();
  cards.addItem(cardElement);
};

const cardList = new Section({
  renderer: (item) => {
    addCard(item, cardList);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm(
  getPopupConfig(popupAddCardSelector),
  getFormConfig(addCardFormElement),
  (data) => {
    addCard(data, cardList);

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

cardList.renderItems(initialCards);

setDefaultUserInfo();




