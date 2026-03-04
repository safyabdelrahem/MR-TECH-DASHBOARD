import axios from "axios";
import { BASE_URL } from "./config";
import { AUTHENTICATION_TOKEN } from "./helpers/constants/StaticKeys";
import AppStorage from "./helpers/Storage";

export const $axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        common: {
            Accept: "application/json",
        },
    },
});

export const $securedAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        common: {
            Accept: "application/json",
        },
    },
});

const requestHandler = (request) => {
    const authToken = AppStorage.getItem(AUTHENTICATION_TOKEN);
    if (authToken) {
        request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
};

const responseHandler = (response) => {
    return response;
};

const errorHandler = (error) => {
    if (error.response && error.response.status === 401) {
        if (window.location.pathname !== "/login") {
            localStorage.clear();
            window.location = "/login";
        }
    }
    return Promise.reject(error);
};

// UNSECURED RESPONSE HANDLER
$axios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error),
);

// SECURED REQUEST HANDLER
$securedAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error),
);

// SECURED RESPONSE HANDLER
$securedAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error),
);
