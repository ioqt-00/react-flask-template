export function setToken(userToken) {
    sessionStorage.setItem('access_token', JSON.stringify(userToken))
}

export function getToken() {
    const tokenString = sessionStorage.getItem('access_token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token
}
