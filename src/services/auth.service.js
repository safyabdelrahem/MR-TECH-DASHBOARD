import { $axios } from '../axios';

export const loginService = (payload, onSuccess, onError, onFinally) => {
    $axios
        .post('/login/po', payload)
        .then((response) => {
            onSuccess(response);
        })
        .catch((error) => {
            onError(error.response);
        })
        .finally(() => {
            if (onFinally) onFinally();
        });
};
