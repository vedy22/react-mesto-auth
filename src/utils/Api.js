class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }

    // Получает все карточки
    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this.onResponse)
    }

    // Получает информацию о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
            .then(this.onResponse)
    }

    // Отправляет информацию о пользователе на сервер
    sendProfileDatasToServer(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            })
        })
            .then(this.onResponse)
    }

    // Отправляет аватар пользователя на сервер
    sendAvatarToServer(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        })
            .then(this.onResponse)
    }

    // Отправляет карточку на сервер
    postCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this.onResponse)
    }

    // Удаляет карточку с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this.onResponse)
    }

    // Лайки
    toggleCardLike(cardId, method) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method,
            headers: this._headers,
        })
            .then(this.onResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        })
            .then(this.onResponse)
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort36',
    headers: {
        authorization: '37537b48-8cd1-46df-bdda-50c6c5fa0f5b',
        'Content-Type': 'application/json'
    }
})

export default api;