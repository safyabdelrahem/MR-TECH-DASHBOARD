import { $securedAxios } from '../axios';

export const getOrders = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/orders/get-all', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};

export const updateOrder = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/orders/update', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};
