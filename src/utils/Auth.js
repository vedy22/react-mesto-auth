export const URL = 'https://auth.nomoreparties.co';

function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export const registration = async (email, password) => {
    const res = await fetch(
        `${URL}/signup`,
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        }
    );
    return onResponse(res);
}

export const authorization = async (email, password) => {
    const res = await fetch(
        `${URL}/signin`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }
    );
    const data = onResponse(res);
    localStorage.setItem('token', data.token);
}

export const login = async (jwtToken) => {
    const res = await fetch(
        `${URL}/users/me`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwtToken}`
            }
        }
    );
    return onResponse(res);
}
