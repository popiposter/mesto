import {popupImageView, imageViewImage, imageViewCaption} from './constants.js';
import {openPopup} from "./popup.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _handleOpenPopup(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }

    imageViewImage.setAttribute('src', this._link);
    imageViewImage.setAttribute('alt', this._name);

    imageViewCaption.textContent = this._name;

    openPopup(popupImageView);
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
      this._handleOpenPopup(evt);
    });
  }
}
