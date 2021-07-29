export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserData() {
    return this._data;
  }

  setUserData(data) {
    this._data = data;
  }

  setUserInfo() {
    this._nameElement.textContent = this._data.name;
    this._aboutElement.textContent = this._data.about;
    this.setAvatar();
  }

  setAvatar() {
    this._avatarElement.style.backgroundImage = `url(${this._data.avatar})`;
  }
}
