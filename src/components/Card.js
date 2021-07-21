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
    this._imageElement = this._element.querySelector('.card__image');
    this._titleElement = this._element.querySelector('.card__title');
    this._likeButton = this._element.querySelector('.card__fav-btn');
    this._deleteButton = this._element.querySelector('.card__delete_btn');

    this._setEventListeners();

    this._imageElement.style.backgroundImage = `url(${this._link})`;
    // Как альтернативу alt используем title у div.
    this._imageElement.setAttribute('title', this._name);
    this._titleElement.textContent = this._name;

    return this._element;
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleToggleFavorite() {
    this._likeButton.classList.toggle('card__fav-btn_favored');
  }

  _handleOpenPopup(data) {
    this._handleCardClick(data);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDelete.bind(this));

    this._imageElement.addEventListener('click', (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }

      this._handleOpenPopup({name: this._name, link: this._link});
    });

    this._likeButton.addEventListener('click', this._handleToggleFavorite.bind(this));
  }
}
