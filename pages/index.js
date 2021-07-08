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
  buttonsClosePopup,
  popups,
  classPopupAnimated
} from "../scripts/constants.js";
import {initialCards} from '../scripts/initial-cards.js';
import Card from '../scripts/Card.js';
import {closePopup, openPopup} from "../scripts/popup.js";



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

const closePopupBtnClick = (evt) => {
  const parentPopup = evt.target.closest('.popup');

  closePopup(parentPopup);
}

const openProfilePopup = () => {
  setDefaultProfileInputTexts();

  openPopup(popupProfile);
}

const openAddCardPopup = () => {
  openPopup(popupAddCard);
}

const setDefaultProfileInputTexts = () => {
  profileInputName.value = profileTitle.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

const profileFormSubmit = () => {
  profileTitle.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

const setEventListeners = () => {
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
  })

  buttonsClosePopup.forEach(closeBtn => {
    closeBtn.addEventListener('click', closePopupBtnClick);
  })

  window.addEventListener('load', () => {
    popups.forEach(popup => {
      // Если добавлять сразу в popup.css, при загрузке сраницы запускается transition на visibility.
      popup.classList.add(classPopupAnimated);

      popup.addEventListener('mousedown', function (evt) {
          if (evt.target === evt.currentTarget) {
            closePopup(popup);
          }
        }
      )
    });
  })
}

addCards(initialCards);
setDefaultProfileInputTexts();
setEventListeners();
