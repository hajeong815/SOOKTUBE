import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    getUsername,
    getUserID,
    checkUserID,
    checkUsername
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`https://soktube.appspot.com/api/authenticate`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if(response.token){
                localStorage.setItem('user', response.token);
                return response.token;
            }
        });
}

function getUsername() {
    let user = localStorage.getItem('user');
    return axios({
        method: 'get',
        url: 'https://soktube.appspot.com/api/auth/myName',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user
        }
    }).then((response) => {
        localStorage.setItem('username', response.data);
        return response.data;
        })
        .catch(error => {
            return error;
        });
}

function getUserID() {
    let user = localStorage.getItem('user') !== "undefined" && typeof localStorage.getItem('user') !== "undefined"
        && localStorage.getItem('user');
    return axios({
        method: 'get',
        url: 'https://soktube.appspot.com/api/auth/myID',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + user
        }
    }).then((response) => {
        return response.data;
    })
        .catch(error => {
            return error;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`https://soktube.appspot.com/api/register/local`, requestOptions).then(handleResponse);
}

function checkUsername(user) {
    return axios.post('https://soktube.appspot.com/api/register/usernameCheck', user
    ).then((response) => {
        return response;
    })
    .catch(error => {
        return error;
    });
}


function checkUserID(user) {
    return axios.post('https://soktube.appspot.com/api/register/idCheck', user
    ).then((response) => {
        return response;
    })
    .catch(error => {
        return error;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}