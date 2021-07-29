export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
export const buttonEditProfile = document.querySelector('.profile__edit-info');
export const buttonAddCard = document.querySelector('.profile__add');

export const popupConfirmSelector = '.popup_id_confirm';
export const popupImageViewSelector = '.popup_id_image-view';
export const popupEditAvatarSelector = '.popup_id_avatar-edit';
export const popupProfileSelector = '.popup_id_profile';

export const profileInputNameElement = document.querySelector('.popup__form-input_id_profile-name');
export const profileInputAboutElement = document.querySelector('.popup__form-input_id_profile-about');

export const popupAddCardSelector = '.popup_id_add-card';

export const popupCloseSelector = '.popup__button-close';

export const profileTitleSelector = '.profile__title';
export const profileAboutSelector = '.profile__about';
export const profileAvatarSelector = '.profile__avatar';

export const cardListSelector = '.cards__list';

export const classPopupOpened = 'popup_opened';

export const cardTemplateSelector = '.card-template';

export const confirmFormElement = document.querySelector('.popup__form_id_confirm');
export const editAvatarFormElement = document.querySelector('.popup__form_id_avatar-edit');
export const addCardFormElement = document.querySelector('.popup__form_id_add-card');
export const profileFormElement = document.querySelector('.popup__form_id_profile');

export const editAvatarSaveBtnText = 'Сохранить';
export const editProfileSaveBtnText = 'Сохранить';
export const addCardSaveBtnText = 'Создать';
export const saveBtnTextSaving = 'Сохранение...';

export const getPopupConfig = (popupSelector, saveBtnText) => {
  return {
    popupSelector: popupSelector,
    classPopupOpened: classPopupOpened,
    popupCloseSelector: popupCloseSelector,
    saveBtnText: saveBtnText
  };
};

export const formData = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  inputErrorActiveClass: 'popup__form-input-error_active',
  errorSelector: '.popup__form-input-error'
};

export const getFormConfig = (formElement) => {
  return {
    formElement: formElement,
    inputSelector: formData.inputSelector
  }
};
