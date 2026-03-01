import { useState } from 'react';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginService } from '../../services/auth.service';

export const INITIAL_STATE = {
    loading: false
};

export const useLoginLogic = (t) => {
    const { message } = App.useApp();
    const [state, setState] = useState(INITIAL_STATE);

    const { login } = useAuth();
    const navigate = useNavigate();

    const updateState = (updates) => {
        setState((prev) => ({ ...prev, ...updates }));
    };

    const handleFinish = (values) => {
        updateState({ loading: true });

        loginService(
            { email: values.email, password: values.password },
            (response) => {
                // Extract token and user data from API response
                const data = response.data?.response || response.data || {};
                const token = data.token || data.access_token || data.accessToken || '';
                const userData = {
                    email: values.email,
                    name: data.name || data.user?.name || values.email,
                    role: data.role || data.user?.role || 'Admin',
                };

                if (token) {
                    login(userData, token);
                    message.success({
                        content: t('login.success'),
                        style: { marginTop: '5vh' }
                    });
                    navigate('/');
                } else {
                    message.error({
                        content: 'Login failed: No token received',
                        style: { marginTop: '5vh' }
                    });
                }
            },
            (errorResponse) => {
                const errorMsg = errorResponse?.data?.message || errorResponse?.data?.error || 'Invalid email or password';
                message.error({
                    content: errorMsg,
                    style: { marginTop: '5vh' }
                });
            },
            () => {
                updateState({ loading: false });
            }
        );
    };

    return {
        state,
        handleFinish
    };
};
