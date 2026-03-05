import { useState, useEffect, useRef } from 'react';
import { App } from 'antd';
import { getOrders, updateOrder } from '../../services/order.service';

export const INITIAL_STATE = {
    orders: [],
    loading: false,
    isModalVisible: false,
    editingOrder: null,
    statusFilter: undefined,
    customerFilter: '',
    productFilter: '',
    pagination: { current: 1, pageSize: 30, total: 0 }
};

export const useOrdersLogic = (form, t) => {
    const { message } = App.useApp();
    const [state, setState] = useState(INITIAL_STATE);

    const updateState = (updates) => {
        setState((prev) => ({ ...prev, ...updates }));
    };

    const isFetching = useRef(false);

    const fetchOrders = (page = 1, pageSize = 30, filters = []) => {
        if (isFetching.current) return;
        isFetching.current = true;
        updateState({ loading: true });

        const payload = {
            page,
            pageSize,
            filters,
            sorts: []
        };

        getOrders(
            payload,
            (response) => {
                const responseData = response.data?.response || {};
                const rawOrders = responseData.data || [];
                const meta = responseData.meta || {};

                updateState({
                    orders: rawOrders,
                    pagination: {
                        current: meta.page || page,
                        pageSize: meta.pageSize || pageSize,
                        total: meta.total || 0
                    },
                });
            },
            (errorResponse) => {
                console.error('Fetch error:', errorResponse);
                updateState({
                    orders: [],
                    pagination: { current: page, pageSize, total: 0 },
                });
                message.error(t('orders.messages.fetch_failed'), 3);
            },
            () => {
                isFetching.current = false;
                updateState({ loading: false });
            }
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const filters = buildFilters(state);
            fetchOrders(1, state.pagination.pageSize, filters);
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.statusFilter, state.customerFilter, state.productFilter]);

    const showModal = (order = null) => {
        updateState({ editingOrder: order, isModalVisible: true });
        if (order) {
            form.setFieldsValue({
                ...order,
            });
        } else {
            form.resetFields();
        }
    };

    const handleCancel = () => {
        updateState({ isModalVisible: false, editingOrder: null });
        form.resetFields();
    };

    const handleSave = (values) => {
        updateState({ loading: true });

        const payload = {
            id: values.id,
            status: values.status
        };

        const onSuccess = () => {
            message.success(t('orders.messages.updated'));
            updateState({ isModalVisible: false, editingOrder: null });
            fetchOrders(state.pagination.current, state.pagination.pageSize, buildFilters(state));
        };

        const onError = (errorResponse) => {
            console.error('Save error:', errorResponse);
            message.error(t('orders.messages.save_failed'));
        };

        const onFinally = () => {
            updateState({ loading: false });
        };

        updateOrder(payload, onSuccess, onError, onFinally);
    };

    const handleTableChange = (pagination) => {
        const filters = buildFilters(state);
        fetchOrders(pagination.current, pagination.pageSize, filters);
    };

    const buildFilters = (currentState) => {
        const filters = [];
        if (currentState.statusFilter) {
            filters.push({ key: 'orders.status', operator: 'LIKE', value: currentState.statusFilter });
        }
        if (currentState.customerFilter) {
            filters.push({ key: 'users.first_name', operator: 'LIKE', value: currentState.customerFilter });
        }
        if (currentState.productFilter) {
            filters.push({ key: 'products.name', operator: 'LIKE', value: currentState.productFilter });
        }
        return filters;
    };

    const onFilterChange = (key, value) => {
        updateState({ [key]: value });
    };

    return {
        state,
        showModal,
        handleCancel,
        handleSave,
        handleTableChange,
        onFilterChange
    };
};
