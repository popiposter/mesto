let buttonEditProfile = document.querySelector('.profile__edit-info');
let popup = document.querySelector('.popup');
let buttonClosePopup = document.querySelector('.popup__button-close');
let popupForm = document.querySelector('.popup__form');

let profileTitle = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__about');

let inputName = document.querySelector('.popup__form-input_id_name');
let inputAbout = document.querySelector('.popup__form-input_id_about');

let classPopupOppenedName = 'popup_oppened';

function openPopup() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileAbout.textContent;

  popup.classList.add(classPopupOppenedName);
}

function closePopup() {
  popup.classList.remove(classPopupOppenedName);
}

function saveProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup();
}

buttonEditProfile.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfile);

