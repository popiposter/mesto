export default class Card {
  constructor(data, userId, {handleCardClick, handleCardLike, handleCardDelete}, cardSelector) {
    this.setCardData(data, userId);
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  setCardData({_id, name, link, likes, owner}, userId) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._likesAmount = this._likes.length;
    this._currentUserid = userId;
    this._isMyCard = owner._id === this._currentUserid;
    this._isLiked = this._getLikeState();
  }

  _getLikeState() {
    return !!this._likes.find(userData => userData._id === this._currentUserid);
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
    this._likesAmountElement = this._element.querySelector('.card__likes');
    this._deleteButton = this._element.querySelector('.card__delete_btn');
    this._likedClass = 'card__fav-btn_favored';

    if (!this._isMyCard) {
      this._deleteButton.style.visibility = 'hidden';
    }

    this.setLikeState();

    this._setEventListeners();

    this._imageElement.style.backgroundImage = `url(${this._link})`;
    // Как альтернативу alt используем title у div.
    this._imageElement.setAttribute('title', this._name);
    this._titleElement.textContent = this._name;
    this.setLikesAmount();

    return this._element;
  }

  _handleDelete() {
    this._handleCardDelete(this._id);
  }

  removeCardElement() {
    this._element.remove();
  }

  _handleToggleFavorite() {
    this._handleCardLike(this._id, this._isLiked);
  }

  setLikeState() {
    if (this._isLiked) {
      this._likeButton.classList.add(this._likedClass);
    } else if (this._likeButton.classList.contains(this._likedClass)) {
      this._likeButton.classList.remove(this._likedClass);
    }
  }

  setLikesAmount() {
    this._likesAmountElement.textContent = this._likesAmount;
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
