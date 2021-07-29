export default class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._authtoken = token;
    this._cardsPath = '/cards/';
    this._userPath = '/users/me';
    this._avatarPath = '/avatar';
    this._likesPath = '/likes/';
  }

  _getPath(...entityPaths) {
    return this._baseUrl + entityPaths.join('');
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка:  ${response.status}`);
  }

  getInitialCards() {
    return fetch(this._getPath(this._cardsPath),
      {
        headers: {
          authorization: this._authtoken
        }
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  getUserInfo() {
    return fetch(this._getPath(this._userPath),
      {
        headers: {
          authorization: this._authtoken
        }
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  setAvatar(link) {
    return fetch(this._getPath(this._userPath, this._avatarPath),
      {
        method: 'PATCH',
        headers: {
          authorization: this._authtoken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  setUserInfo({name, about}) {
    return fetch(this._getPath(this._userPath),
      {
        method: 'PATCH',
        headers: {
          authorization: this._authtoken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  addCard({name, link}) {
    return fetch(this._getPath(this._cardsPath),
      {
        method: 'POST',
        headers: {
          authorization: this._authtoken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  deleteCard(cardId) {
    return fetch(this._getPath(this._cardsPath, cardId),
      {
        method: 'DELETE',
        headers: {
          authorization: this._authtoken
        }
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  addCardLike(cardId) {
    return fetch(this._getPath(this._cardsPath, this._likesPath, cardId),
      {
        method: 'PUT',
        headers: {
          authorization: this._authtoken
        }
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }

  removeCardLike(cardId) {
    return fetch(this._getPath(this._cardsPath, this._likesPath, cardId),
      {
        method: 'DELETE',
        headers: {
          authorization: this._authtoken
        }
      })
      .then(res => {
        return this._handleResponse(res);
      })
  }
}
