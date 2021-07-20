import './index.css';

import {
  addCardFormSelector,
  buttonAddCard,
  buttonEditProfile,
  cardListSelector,
  cardsListElement,
  cardTemplateSelector,
  classCardFavored,
  deleteCardSelector,
  favCardSelector,
  formData,
  formList,
  initialCards,
  popupAddCardSelector,
  popupImageViewSelector,
  popupProfileSelector,
  profileAboutSelector,
  profileFormSelector,
  profileInputAboutElement,
  profileInputNameElement,
  profileTitleSelector
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(item, popupImageViewSelector);
        popupWithImage.setEventListeners();
        popupWithImage.open();
      }
    }, cardTemplateSelector);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  formSelector: addCardFormSelector,
  handleFormSubmit: (data) => {
    const card = new Card({
      data: data,
      handleCardClick: () => {
        const popupWithImage = new PopupWithImage(data, popupImageViewSelector);
        popupWithImage.setEventListeners();
        popupWithImage.open();
      }
    }, cardTemplateSelector);

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
});

const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  aboutSelector: profileAboutSelector
});

const setDefaultUserInfo = () => {
  const userData = userInfo.getUserInfo();
  profileInputNameElement.value = userData.name;
  profileInputAboutElement.value = userData.about;
};

const profilePopup = new PopupWithForm({
  popupSelector: popupProfileSelector,
  formSelector: profileFormSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  }
});

const deleteCard = (evt) => {
  const parentCard = evt.target.closest('.card');

  if (parentCard) {
    parentCard.remove();
  }
}

const toggleFavorite = (evt) => {
  evt.target.classList.toggle(classCardFavored);
}

(() => {
  addCardPopup.setEventListeners();
  profilePopup.setEventListeners();

  // buttonAddCard.addEventListener('click', addCardPopup.open.bind(addCardPopup));
  buttonAddCard.addEventListener('click', () => {
    addCardPopup.open();
  });
  buttonEditProfile.addEventListener('click', () => {
    setDefaultUserInfo();
    profilePopup.open();
  });

  cardsListElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains(deleteCardSelector)) {
      deleteCard(evt);
    } else if (evt.target.classList.contains(favCardSelector)) {
      toggleFavorite(evt);
    }
  });

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formData, formElement);
    formValidator.enableValidation();
  });

  cardList.renderItems();

  setDefaultUserInfo();
})()



