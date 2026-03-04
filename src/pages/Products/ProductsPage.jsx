import React from 'react';
import {
    Table,
    Space,
    Button,
    Typography,
    Input,
    Card,
    Tooltip,
    Modal,
    Form,
    InputNumber,
    Upload,
    Image,
    Badge
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useProductsLogic } from './logic';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ProductsPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const {
        state,
        showModal,
        handleCancel,
        handleSave,
        handleTableChange,
        handleSearch
    } = useProductsLogic(form, t);

    const columns = [
        {
            title: t('products.table.asset'),
            key: 'image',
            width: 110,
            render: (_, record) => {
                const firstImage = record.images && record.images.length > 0 ? record.images[0] : null;
                return firstImage ? (
                    <Badge count={record.images.length > 1 ? record.images.length : 0} size="small" color="#D4AF37">
                        <Image
                            src={firstImage.url}
                            width={48}
                            height={48}
                            style={{ objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
                            preview={record.images.length > 1 ? {
                                imageRender: () => (
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {record.images.map(img => (
                                            <img key={img.image_id} src={img.url} style={{ maxHeight: '80vh', maxWidth: '45vw', objectFit: 'contain' }} alt="" />
                                        ))}
                                    </div>
                                ),
                                toolbarRender: () => null,
                            } : true}
                        />
                    </Badge>
                ) : (
                    <div style={{
                        width: 48,
                        height: 48,
                        background: '#f1f5f9',
                        borderRadius: 8,
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4AF37',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>
                        {record.name ? record.name.charAt(0).toUpperCase() : '?'}
                    </div>
                );
            },
        },
        {
            title: t('products.table.details'), // using this for name
            key: 'name',
            render: (_, record) => (
                <Text strong style={{ color: '#1a1a1a' }}>{record.name}</Text>
            )
        },
        {
            title: t('products.modal.description'),
            dataIndex: 'description',
            key: 'description',
            render: (desc) => <Text type="secondary">{desc || t('products.table.no_description')}</Text>
        },
        {
            title: t('products.table.price'),
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Text strong>${price ? Number(price).toFixed(2) : '0.00'}</Text>
        },
        {
            title: t('products.table.inventory'),
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
            render: (stock) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text style={{ fontSize: 13, fontWeight: 500 }}>{stock || 0} {t('products.table.units')}</Text>
                    <div style={{ width: 60, height: 4, background: '#f1f5f9', borderRadius: 2 }}>
                        <div style={{
                            width: `${Math.min(stock || 0, 100)}%`,
                            height: '100%',
                            background: (stock || 0) < 10 ? '#ef4444' : '#D4AF37',
                            borderRadius: 2
                        }} />
                    </div>
                </div>
            )
        },
        {
            title: t('products.table.operations'),
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={t('products.modal.edit')}>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            style={{ color: '#D4AF37' }}
                            onClick={() => showModal(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0, fontWeight: 800 }}>
                        {t('products.title')}
                    </Title>
                    <Text type="secondary">{t('products.subtitle')}</Text>
                </div>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => showModal()}>
                        {t('products.new_product')}
                    </Button>
                </Space>
            </div>

            <Card className="premium-card" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Input
                        placeholder={t('products.search_placeholder')}
                        prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                        size="large"
                        value={state.searchText}
                        onChange={handleSearch}
                        style={{ maxWidth: 450, borderRadius: 10 }}
                    />
                </div>
            </Card>

            <div className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                <Table
                    columns={columns}
                    dataSource={state.products}
                    pagination={{
                        current: state.pagination.current,
                        pageSize: state.pagination.pageSize,
                        total: state.pagination.total,
                        onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                    }}
                    onChange={handleTableChange}
                    loading={state.loading}
                    rowKey="id"
                />
            </div>

            <Modal
                title={state.editingProduct ? t('products.modal.edit') : t('products.modal.add')}
                open={state.isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={520}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{ stock_quantity: 0, price: 0 }}
                    style={{ paddingTop: 20 }}
                    size="large"
                >
                    <Form.Item
                        name="name"
                        label={t('products.modal.name')}
                        rules={[{ required: true, message: t('products.modal.required') }]}
                    >
                        <Input placeholder={t('products.modal.name_placeholder')} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label={t('products.modal.description')}
                    >
                        <TextArea rows={3} placeholder={t('products.modal.description_placeholder')} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item name="price" label={t('products.modal.price')} style={{ flex: 1 }}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item name="stock_quantity" label={t('products.modal.stock')} style={{ flex: 1 }}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="images"
                        label={t('products.modal.images')}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="file"
                            listType="picture"
                            beforeUpload={() => false}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>{t('products.modal.select_images')}</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>{t('products.modal.cancel')}</Button>
                            <Button type="primary" htmlType="submit" loading={state.loading}>
                                {state.editingProduct ? t('products.modal.save') : t('products.modal.create')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default ProductsPage;
