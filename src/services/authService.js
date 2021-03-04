import httpService from "./httpService";
import jwtDecode from "jwt-decode";
const authURL = "/auth";
const tokenKey = "token";

export const login = async (username, password) => {
    const {data: jwt} = await httpService.post(authURL, {username, password})
    localStorage.setItem(tokenKey, jwt.token);
}

export const loginWithJwt = (jwt) => {
    localStorage.setItem(tokenKey, jwt);

}

export const logout = () => {
    localStorage.removeItem(tokenKey);
}

export const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return  jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export const getJwt = () => {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
};
