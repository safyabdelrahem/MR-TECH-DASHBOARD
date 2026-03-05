import { $securedAxios } from '../axios';

export const getReviews = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/reviews/get-all', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};

export const updateReview = (payload, onSuccess, onError, onFinally) => {
    $securedAxios
        .post('/reviews/update', payload)
        .then(
            (response) => { onSuccess(response); },
            (error) => { onError(error.response); }
        )
        .finally(() => {
            if (onFinally) onFinally();
        });
};
