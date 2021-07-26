export default class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._authtoken = token;
    this._cardsPath = '/cards';
  }

  getInitialCards() {
    return fetch(this._baseUrl + this._cardsPath, {
      headers: {
        authorization: this._authtoken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка:  ${res.status}`);
      })
  }
}
