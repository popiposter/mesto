const buttonEditProfile = document.querySelector('.profile__edit-info');
const buttonAddCard = document.querySelector('.profile__add');

const popupImageView = document.querySelector('.popup_id_image-view');
const ImageViewImage = popupImageView.querySelector('.popup__image');
const ImageViewCaption = popupImageView.querySelector('.popup__image-caption');

const popupProfile = document.querySelector('.popup_id_profile');
const profileForm = popupProfile.querySelector('.popup__form_id_profile');
const profileInputName = profileForm.querySelector('.popup__form-input_id_profile-name');
const profileInputAbout = profileForm.querySelector('.popup__form-input_id_profile-about');

const popupAddCard = document.querySelector('.popup_id_add-card');
const addCardForm = popupAddCard.querySelector('.popup__form_id_add-card');
const addCardInputName = addCardForm.querySelector('.popup__form-input_id_add-card-name');
const addCardInputLink = addCardForm.querySelector('.popup__form-input_id_add-card-link');

const popups = [popupProfile, popupAddCard, popupImageView];

const buttonsClosePopup = document.querySelectorAll('.popup__button-close');

const profileTitle = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__about');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const classPopupOpened = 'popup_opened';
const classCardFavored = 'card__fav-btn_favored';
const classPopupAnimated = 'popup_animated';

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const deleteBtn = cardImg.querySelector('.card__delete_btn');
  const favBtn = cardElement.querySelector('.card__fav-btn');

  cardImg.style.backgroundImage = "url('" + cardData.link + "')";

  cardImg.addEventListener('click', addCardBtnClick);
  deleteBtn.addEventListener('click', deleteCard);
  favBtn.addEventListener('click', toggleFavorite);

  cardElement.querySelector('.card__title').textContent = cardData.name;

  return cardElement;
}

function addCard(cardElement, position = 'start') {
  if (position === 'start') {
    cardsList.append(cardElement);
  } else {
    cardsList.prepend(cardElement);
  }
}

function addCards(cardsList) {
  cardsList.forEach(cardData => {
    const cardElement = createCard(cardData);
    addCard(cardElement);
  });
}

function addCardBtnClick(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  const cardData = getCardDataFromImage(evt.target);
  setPopupImageView(cardData);

  openPopup(popupImageView);
}

function getCardDataFromImage(cardImage) {
  const parentCard = cardImage.closest('.card');
  const cardName = parentCard.querySelector('.card__title').textContent;
  const cardUrl = cardImage.style.backgroundImage.slice(4, -1).replace(/"/g, "");

  return {name: cardName, link: cardUrl};
}

function setPopupImageView(cardData) {
  ImageViewImage.setAttribute('src', cardData.link);
  ImageViewImage.setAttribute('alt', cardData.name);

  ImageViewCaption.textContent = cardData.name;
}

function openPopup(popup) {
  popup.classList.add(classPopupOpened);
}

function closePopupBtnClick(evt) {
  const parentPopup = evt.target.closest('.popup');

  closePopup(parentPopup);
}

function closePopup(popup) {
  if (popup === popupProfile || popupAddCard) {
    resetForms();
  }

  popup.classList.remove(classPopupOpened);
}

function resetForms() {
  profileForm.reset();
  addCardForm.reset();
}

function openProfilePopup() {
  profileInputName.value = profileTitle.textContent;
  profileInputAbout.value = profileAbout.textContent;

  openPopup(popupProfile);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

function profileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

function addCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {name: addCardInputName.value, link: addCardInputLink.value};
  const cardElement = createCard(cardData);

  addCard(cardElement, 'end');

  closePopup(popupAddCard);
}

function deleteCard(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  const parentCard = evt.target.closest('.card');

  if (!(typeof parentCard === undefined)) {
    parentCard.remove();
  }
}

function toggleFavorite(evt) {
  evt.target.classList.toggle(classCardFavored);
}

addCards(initialCards);

buttonEditProfile.addEventListener('click', openProfilePopup);
profileForm.addEventListener('submit', profileFormSubmit);

buttonAddCard.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', addCardFormSubmit);

buttonsClosePopup.forEach(closeBtn => {
  closeBtn.addEventListener('click', closePopupBtnClick);
})

window.addEventListener('load', () => {
  popups.forEach(popup => {
    // Если добавлять сразу в popup.css, при загрузке сраницы запускается transition на visibility.
    popup.classList.add(classPopupAnimated);
  })
})
