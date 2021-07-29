import './index.css';

import {
  addCardFormElement, addCardSaveBtnText,
  buttonAddCard, buttonEditAvatar,
  buttonEditProfile,
  cardListSelector,
  cardTemplateSelector, confirmFormElement, editAvatarFormElement, editAvatarSaveBtnText, editProfileSaveBtnText,
  formData,
  getFormConfig,
  getPopupConfig,
  popupAddCardSelector, popupConfirmSelector, popupEditAvatarSelector,
  popupImageViewSelector,
  popupProfileSelector,
  profileAboutSelector, profileAvatarSelector,
  profileFormElement,
  profileInputAboutElement,
  profileInputNameElement,
  profileTitleSelector, saveBtnTextSaving,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  token: '568f90d1-38c3-4e48-946b-3689db798031'
});

const handleApiError = (err) => {
  console.log(err);
}

const openFormPopup = (popup, formValidator) => {
  formValidator.toggleButtonState();
  formValidator.resetErrors();

  popup.open();
};

const confirmPopup = new PopupWithConfirm(
  getPopupConfig(popupConfirmSelector, ''),
  confirmFormElement
);

confirmPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  getPopupConfig(popupEditAvatarSelector, editAvatarSaveBtnText),
  getFormConfig(editAvatarFormElement),
  (data) => {
    editAvatarPopup.setSaveButtonText(saveBtnTextSaving);
    api.setAvatar(data.link)
      .then((data) => {
        userInfo.setUserData(data);
        userInfo.setAvatar();
        editAvatarPopup.close();
      })
      .catch(err => handleApiError(err))
      .finally(() => editAvatarPopup.resetSaveButtonText());
  });

// Профиль.
const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  aboutSelector: profileAboutSelector,
  avatarSelector: profileAvatarSelector
});

const setUserFormCurrentValues = () => {
  const userData = userInfo.getUserData();
  profileInputNameElement.value = userData.name;
  profileInputAboutElement.value = userData.about;
};

const profilePopup = new PopupWithForm(
  getPopupConfig(popupProfileSelector, editProfileSaveBtnText),
  getFormConfig(profileFormElement),
  (data) => {
    profilePopup.setSaveButtonText(saveBtnTextSaving);
    api.setUserInfo(data)
      .then(data => {
        userInfo.setUserData(data);
        userInfo.setUserInfo();
      })
      .catch(err => handleApiError(err))
      .finally(() => profilePopup.resetSaveButtonText());

    profilePopup.close();
  }
);

// Карточки.
const cardPopup = new PopupWithImage(getPopupConfig(popupImageViewSelector));
cardPopup.setEventListeners();

const toggleCardLike = (cardId, isLiked) => {
  return isLiked ?
    api.removeCardLike(cardId)
    : api.addCardLike(cardId);
}

const createCardElement = (data, currentUserId) => {
  const card = new Card(
    data,
    currentUserId,
    {
      handleCardClick: (data) => {
        cardPopup.open(data);
      },
      handleCardLike: (cardId, isLiked) => {
        toggleCardLike(cardId, isLiked)
          .then((data) => {
            card.setCardData(data, currentUserId);
            card.setLikeState();
            card.setLikesAmount();
          })
          .catch(err => handleApiError(err));
      },
      handleCardDelete: (cardId) => {
        confirmPopup.setSubmitEventListener(() => {
          api.deleteCard(cardId)
            .then(() => card.removeCardElement())
            .catch(err => handleApiError(err))
            .finally(() => confirmPopup.close());
        });
        confirmPopup.open();

      }
    }
    , cardTemplateSelector);

  return card.generateCard();
};

const cardList = new Section({
  renderer: (item) => {
    const newCard = createCardElement(item, userInfo.getUserData()._id);
    cardList.addItem(newCard);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm(
  getPopupConfig(popupAddCardSelector, addCardSaveBtnText),
  getFormConfig(addCardFormElement),
  (data) => {
    addCardPopup.setSaveButtonText(saveBtnTextSaving);
    api.addCard(data)
      .then((data) => {
        const newCard = createCardElement(data, userInfo.getUserData()._id);
        cardList.prependItem(newCard);

        addCardPopup.close();
      })
      .catch(err => handleApiError(err))
      .finally(() => addCardPopup.resetSaveButtonText());
  }
)

const userInfoPromise = api.getUserInfo()
  .then(data => {
    userInfo.setUserData(data);
    userInfo.setUserInfo();
  });

const initialCardsPromise = api.getInitialCards()
  .then(res => {
    cardList.renderItems(res);
  });

const promises = [userInfoPromise, initialCardsPromise];

Promise.all(promises)
  .then(() => {
    // Аватар.
    const editAvatarFormValidator = new FormValidator(formData, editAvatarFormElement);
    editAvatarFormValidator.enableValidation();

    buttonEditAvatar.addEventListener('click', () => {
      openFormPopup(editAvatarPopup, editAvatarFormValidator);
    });

    editAvatarPopup.setEventListeners();
    // Профиль.
    const profileFormValidator = new FormValidator(formData, profileFormElement);
    profileFormValidator.enableValidation();

    buttonEditProfile.addEventListener('click', () => {
      setUserFormCurrentValues();
      openFormPopup(profilePopup, profileFormValidator);
    });

    profilePopup.setEventListeners();
    // Новое карточка.
    const addCardFormValidator = new FormValidator(formData, addCardFormElement);
    addCardFormValidator.enableValidation();

    buttonAddCard.addEventListener('click', () => {
      openFormPopup(addCardPopup, addCardFormValidator);
    });

    addCardPopup.setEventListeners();
  })
  .catch(err => handleApiError(err));


