import Popup from './Popup.js';
import {imageViewCaption, imageViewImage} from '../../scripts/constants.js';

export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);

    this._name = name;
    this._link = link;
  }

  open() {
    imageViewImage.setAttribute('alt', this._name);
    imageViewImage.setAttribute('src', this._link);
    imageViewCaption.textContent = this._name;

    super.open();
  }
}
