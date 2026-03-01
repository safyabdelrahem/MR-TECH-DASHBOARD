import { $securedAxios } from '../axios';

export const getProducts = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/products/get-all', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};

export const createProduct = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/products/create', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};

export const updateProduct = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/products/update', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};
