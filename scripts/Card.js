export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._handleCardClick({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
      this._handleOpenPopup(evt);
    });
  }
}
