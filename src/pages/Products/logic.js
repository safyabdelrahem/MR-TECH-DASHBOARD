import { useState, useEffect, useRef, useCallback } from 'react';
import { App } from 'antd';
import { getProducts, createProduct, updateProduct } from '../../services/product.service';

export const INITIAL_STATE = {
    products: [],
    loading: false,
    searchText: '',
    isModalVisible: false,
    editingProduct: null,
    pagination: { current: 1, pageSize: 6, total: 0 }
};

export const useProductsLogic = (form, t) => {
    const { message } = App.useApp();
    const [state, setState] = useState(INITIAL_STATE);

    const updateState = (updates) => {
        setState((prev) => ({ ...prev, ...updates }));
    };

    const isFetching = useRef(false);

    const fetchProducts = (page = 1, pageSize = 6, filters = []) => {
        if (isFetching.current) return;
        isFetching.current = true;
        updateState({ loading: true });

        const payload = { page, pageSize };
        if (filters.length > 0) {
            payload.filters = filters;
        }

        getProducts(
            payload,
            (response) => {
                const raw = response.data?.response || response.data?.data || [];
                const rawProducts = Array.isArray(raw) ? raw : [raw];

                const products = rawProducts.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    stock_quantity: product.stock_quantity,
                    description: product.description,
                    images: (product.images || []).filter(img => img !== null).map(img => ({
                        image_id: img.id,
                        url: img.url,
                        mime_type: img.mime_type,
                    })),
                }));

                updateState({
                    products,
                    pagination: { current: page, pageSize, total: products.length },
                });
            },
            (errorResponse) => {
                console.error('Fetch error:', errorResponse);
                updateState({
                    products: [],
                    pagination: { current: page, pageSize, total: 0 },
                });
                message.error(t('products.messages.fetch_failed'), 3);
            },
            () => {
                isFetching.current = false;
                updateState({ loading: false });
            }
        );
    };

    useEffect(() => {
        fetchProducts(state.pagination.current, state.pagination.pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showModal = (product = null) => {
        updateState({ editingProduct: product, isModalVisible: true });
        if (product) {
            form.setFieldsValue({
                ...product,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ stock_quantity: 0, price: 0 });
        }
    };

    const handleCancel = () => {
        updateState({ isModalVisible: false, editingProduct: null });
        form.resetFields();
    };

    const handleSave = (values) => {
        updateState({ loading: true });
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description || '');
        formData.append('stock_quantity', values.stock_quantity);


        // Handle images array
        if (values.images && Array.isArray(values.images)) {
            values.images.forEach(file => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                } else if (file instanceof File) {
                    formData.append('images', file);
                }
            });
        } else if (values.images && values.images.fileList) {
            values.images.fileList.forEach(file => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });
        }

        // Visualize FormData for debugging
        const plainFormData = Object.fromEntries(formData.entries());

        // Log images correctly (since they are arrays of files and Object.fromEntries only shows the last one)
        const imagesList = formData.getAll('images');
        if (imagesList.length) plainFormData.images = imagesList;

        console.log('FormData values preview:', plainFormData);

        const onSuccess = () => {
            message.success(state.editingProduct ? t('products.messages.updated') : t('products.messages.added'));
            updateState({ isModalVisible: false, editingProduct: null });
            fetchProducts(state.pagination.current, state.pagination.pageSize);
        };

        const onError = (errorResponse) => {
            console.error('Save error:', errorResponse);
            message.error(t('products.messages.save_failed'));
        };

        const onFinally = () => {
            updateState({ loading: false });
        };

        if (state.editingProduct) {
            formData.append('id', state.editingProduct.id);
            updateProduct(formData, onSuccess, onError, onFinally);
        } else {
            createProduct(formData, onSuccess, onError, onFinally);
        }
    };

    const handleTableChange = (pagination) => {
        const filters = state.searchText
            ? [{ key: 'name', operator: 'LIKE', value: state.searchText }]
            : [];
        fetchProducts(pagination.current, pagination.pageSize, filters);
    };

    // Debounce timer ref
    const searchTimer = useRef(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        updateState({ searchText: value });

        // Debounce: wait 500ms after user stops typing
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            const filters = value
                ? [{ key: 'name', operator: 'LIKE', value }]
                : [];
            fetchProducts(1, state.pagination.pageSize, filters);
        }, 500);
    };

    return {
        state,
        showModal,
        handleCancel,
        handleSave,
        handleTableChange,
        handleSearch
    };
};
