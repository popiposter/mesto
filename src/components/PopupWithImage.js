import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({popupSelector, classPopupOpened, popupCloseSelector}) {
    super({popupSelector, classPopupOpened, popupCloseSelector});

    this._imageViewImage = this._element.querySelector('.popup__image');
    this._imageViewCaption = this._element.querySelector('.popup__image-caption');
  }

  open({name, link}) {
    this._imageViewImage.setAttribute('alt', name);
    this._imageViewImage.setAttribute('src', link);
    this._imageViewCaption.textContent = name;

    super.open();
  }
}
