import httpService from "./httpService";
const registerURL = "/register";

export const register = (user) => {
    return httpService.post(registerURL, {
        username: user.username,
        password: user.password,
        name: user.personName
    });
}

