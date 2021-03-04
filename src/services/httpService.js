import axios from "axios";
import {toast} from "react-toastify";
import * as Sentry from "@sentry/react";
import logService from "./logService";
import authService from "./authService";
import {func} from "prop-types";

// axios.defaults.headers.common['Authorization'] = "Bearer " + authService.getJwt();

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
       logService.log(error);
       toast("An unexpected error occurred");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
