import {
  cardsList,
  cardTemplateSelector,
  addCardInputName,
  addCardInputLink,
  addCardForm,
  addCardSaveBtn,
  classButtonDisabled,
  classCardFavored,
  popupAddCard,
  popupProfile,
  profileAbout,
  profileInputAbout,
  profileInputName,
  profileTitle,
  buttonEditProfile,
  profileForm,
  buttonAddCard,
  classDeleteCardBtn,
  classFavCardBtn,
  formList,
  formData
} from "../scripts/constants.js";
import {initialCards} from '../scripts/initial-cards.js';
import Card from '../scripts/Card.js';
import {
  closePopup,
  setDefaultProfileInputTexts,
  openProfilePopup,
  openAddCardPopup,
  initPopups
} from "../scripts/popup.js";
import FormValidator from "../scripts/FormValidator.js";

const addCard = (cardElement, position = 'start') => {
  if (position === 'start') {
    cardsList.append(cardElement);
  } else {
    cardsList.prepend(cardElement);
  }
}

const addCards = (cardsList) => {
  cardsList.forEach(cardData => {
    const newCard = new Card(cardData, cardTemplateSelector);
    const cardElement = newCard.generateCard();
    addCard(cardElement);
  });
}

const addCardFormSubmit = () => {
  const cardData = {name: addCardInputName.value, link: addCardInputLink.value};
  const newCard = new Card(cardData, cardTemplateSelector);
  const cardElement = newCard.generateCard();

  addCard(cardElement, 'end');

  closePopup(popupAddCard);

  addCardForm.reset();

  addCardSaveBtn.classList.add(classButtonDisabled);
}

const deleteCard = (evt) => {
  const parentCard = evt.target.closest('.card');

  if (!(typeof parentCard === undefined)) {
    parentCard.remove();
  }
}

const toggleFavorite = (evt) => {
  evt.target.classList.toggle(classCardFavored);
}

const profileFormSubmit = () => {
  profileTitle.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

const initPage = () => {
  addCards(initialCards);
  setDefaultProfileInputTexts();

  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formData, formElement);
    formValidator.enableValidation();
  });

  buttonEditProfile.addEventListener('click', openProfilePopup);
  profileForm.addEventListener('submit', profileFormSubmit);

  buttonAddCard.addEventListener('click', openAddCardPopup);
  addCardForm.addEventListener('submit', addCardFormSubmit);

  cardsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains(classDeleteCardBtn)) {
      deleteCard(evt);
    } else if (evt.target.classList.contains(classFavCardBtn)) {
      toggleFavorite(evt);
    }
  });

  initPopups();
}

initPage();


