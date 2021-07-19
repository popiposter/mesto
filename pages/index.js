import {cardListSelector, cardTemplateSelector, initialCards, popupImageViewSelector} from '../scripts/constants.js';
import Card from '../scripts/Card.js';
import Section from '../src/components/Section.js';
import PopupWithImage from '../src/components/PopupWithImage.js';

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

cardList.renderItems();
// const addCard = (cardElement) => {
//   cardsList.prepend(cardElement);
// }
//
// const addCards = (cardsList) => {
//   cardsList.reverse().forEach(cardData => {
//     createCard(cardData);
//   });
// }
//
// const createCard = (data) => {
//   const newCard = new Card({data, openCardPopup}, cardTemplateSelector);
//   const cardElement = newCard.generateCard();
//
//   addCard(cardElement);
// }
//
// const addCardFormSubmit = () => {
//   createCard({name: addCardInputName.value, link: addCardInputLink.value});
//
//   closePopup(popupAddCard);
//
//   addCardForm.reset();
//
//   addCardSaveBtn.classList.add(classButtonDisabled);
// }
//
// const deleteCard = (evt) => {
//   const parentCard = evt.target.closest('.card');
//
//   if (parentCard) {
//     parentCard.remove();
//   }
// }
//
// const toggleFavorite = (evt) => {
//   evt.target.classList.toggle(classCardFavored);
// }
//
// const profileFormSubmit = () => {
//   profileTitle.textContent = profileInputName.value;
//   profileAbout.textContent = profileInputAbout.value;
//
//   closePopup(popupProfile);
// }
//
// (() => {
//   addCards(initialCards);
//   setDefaultProfileInputTexts();
//
//   formList.forEach((formElement) => {
//     const formValidator = new FormValidator(formData, formElement);
//     formValidator.enableValidation();
//   });
//
//   buttonEditProfile.addEventListener('click', openProfilePopup);
//   profileForm.addEventListener('submit', profileFormSubmit);
//
//   buttonAddCard.addEventListener('click', openAddCardPopup);
//   addCardForm.addEventListener('submit', addCardFormSubmit);
//
//   cardsList.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains(classDeleteCardBtn)) {
//       deleteCard(evt);
//     } else if (evt.target.classList.contains(classFavCardBtn)) {
//       toggleFavorite(evt);
//     }
//   });
//
//   initPopups();
// })()



