// Register, Login, Logout, Refresh Token Implementations
async function login(username, password) {
    const url = 'http://127.0.0.1:8000/api/token/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username,
                password
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json();
        console.log(data);

        // Store tokens in localStorage
        localStorage.setItem('userSession', JSON.stringify(data))
        return data;
    }
    catch (error) {
        throw error;
    }
}


async function register(username, email, password, password2) {
    const url = 'http://127.0.0.1:8000/register/';

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password,
                password2
            })
        });
        if (!response.ok) {
            throw new Error(data.detail || JSON.stringify(data));
        }
        const data = await response.json();
        return data;
}


function getAccessToken() {
    const sessionData = localStorage.getItem('userSession');

    if (!sessionData) {
        return null;
    }

    const session = JSON.parse(sessionData);

    return session.access;
}

function getRefreshToken() {
    const sessionData = localStorage.getItem("userSession");

    if (!sessionData) {
        return null;
    }

    const session = JSON.parse(sessionData);

    return session.refresh;
}

export { getAccessToken, login, register, getRefreshToken };