let buttonEditProfile = document.querySelector('.profile__edit-info');
let formProfile = document.querySelector('.popup-profile-form');
let buttonCloseProfile = document.querySelector('.popup-profile-form__button-close');
let buttonSaveProfile = document.querySelector('.popup-profile-form__button-save');

let profileTitle = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__about');

let inputName = document.querySelector('.popup-profile-form__item-name');
let inputAbout = document.querySelector('.popup-profile-form__item-about');

function toggleFormVisibility() {
  formProfile.classList.toggle('popup-profile-form_oppened');
}

function fillFormInputValues() {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileAbout.textContent;
}

function setProfileTexts() {
  profileTitle.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
}

function openProfileForm() {
  toggleFormVisibility();
  fillFormInputValues();
}

function saveProfile() {
  setProfileTexts();
  toggleFormVisibility();
}

buttonEditProfile.addEventListener('click', openProfileForm);
buttonCloseProfile.addEventListener('click', toggleFormVisibility);
buttonSaveProfile.addEventListener('click', saveProfile);
