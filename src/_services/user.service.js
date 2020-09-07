import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
};

function login(username, password) {
    const user ={
        'username':username,
        'password':password
    };
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://localhost:9000/api/login`, requestOptions)
        .then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.accepted) { 
            if (response.status === 403) {
                // auto logout if 403 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    });
}