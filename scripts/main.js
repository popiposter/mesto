const buttonEditProfile = document.querySelector('.profile__edit-info');
const buttonAddCard = document.querySelector('.profile__add');

const popupImageView = document.querySelector('.popup_id_image-view');
const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');
const buttonClosePopupImage = popupImageView.querySelector('.popup__button-close_id_image');

const popupForm = document.querySelector('.popup_id_form');
const popupTitle = popupForm.querySelector('.popup__title');

const profileForm = popupForm.querySelector('.popup__form_id_profile');
const profileInputName = profileForm.querySelector('.popup__form-input_id_profile-name');
const profileInputAbout = profileForm.querySelector('.popup__form-input_id_profile-about');

const addCardForm = popupForm.querySelector('.popup__form_id_add-card');
const addCardInputName = addCardForm.querySelector('.popup__form-input_id_add-card-name');
const addCardInputLink = addCardForm.querySelector('.popup__form-input_id_add-card-link');

const buttonClosePopupForm = popupForm.querySelector('.popup__button-close_id_form');

const profileTitle = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__about');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

const classPopupOpened = 'popup_opened';
const classCardFavored = 'card_favored';
const classFormHidden = 'popup__form_hidden';

const initialCards = [
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

function addCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const deleteBtn = cardImg.querySelector('.card__delete_btn');
  const favBtn = cardElement.querySelector('.card__fav-btn');

  cardImg.style.backgroundImage = "url('" + cardData.link + "')";
  cardImg.setAttribute('alt', cardData.name);

  cardImg.addEventListener('click', openImagePopup);
  deleteBtn.addEventListener('click', deleteCard);
  favBtn.addEventListener('click', toggleFavorite);

  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardsList.append(cardElement);
}

function addCards(cards) {
  cards.forEach(cardData => addCard(cardData));
}

function openImagePopup(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }

  const clickedImg = evt.target;
  const parentCard = clickedImg.closest('.card');
  const cardTitle = parentCard.querySelector('.card__title');

  popupImage.setAttribute('src', clickedImg.style.backgroundImage.slice(4, -1).replace(/"/g, ""));
  popupImage.setAttribute('alt', cardTitle.textContent);

  popupImageCaption.textContent = cardTitle.textContent;

  openPopup(popupImageView);
}

function openPopup(popup) {
  popup.classList.add(classPopupOpened);
}

function closeFormPopup() {
  popupForm.classList.remove(classPopupOpened);

  profileForm.reset();
  addCardForm.reset();
}

function closeImagePopup() {
  popupImageView.classList.remove(classPopupOpened);
}

function setPopupFormsVisibility(visibleForm, hiddenForm) {
  if (visibleForm.classList.contains(classFormHidden)) {
    visibleForm.classList.remove(classFormHidden);
  }

  if (!hiddenForm.classList.contains(classFormHidden)) {
    hiddenForm.classList.add(classFormHidden);
  }
}

function openProfilePopup() {
  profileInputName.value = profileTitle.textContent;
  profileInputAbout.value = profileAbout.textContent;

  popupTitle.textContent = 'Редактировать профиль';

  setPopupFormsVisibility(profileForm, addCardForm);
  openPopup(popupForm);
}

function openAddCardPopup() {
  popupTitle.textContent = 'Новое место';

  setPopupFormsVisibility(addCardForm, profileForm);
  openPopup(popupForm);
}

function saveProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closeFormPopup();
}

function addNewCard(evt) {
  evt.preventDefault();

  addCard({name: addCardInputName.value, link: addCardInputLink.value});

  closeFormPopup();
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
profileForm.addEventListener('submit', saveProfile);

buttonAddCard.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', addNewCard);

buttonClosePopupForm.addEventListener('click', closeFormPopup);
buttonClosePopupImage.addEventListener('click', closeImagePopup);

window.addEventListener('load', () => {
  popupForm.classList.add('popup_animated');
  popupImageView.classList.add('popup_animated');
})
