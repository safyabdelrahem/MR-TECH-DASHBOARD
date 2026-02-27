import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Button,
    Typography,
    Input,
    Card,
    message,
    Tooltip,
    Modal,
    Form,
    InputNumber,
    Select,
    Popconfirm
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    FilterOutlined,
    ExportOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Option } = Select;

const ProductsPage = () => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    const [products, setProducts] = useState([
        {
            key: '1',
            name: 'Titanium Security Camera v2',
            category: 'Surveillance',
            price: 599.00,
            stock: 45,
            status: 'In Stock',
        },
        {
            key: '2',
            name: 'Cyber Sentinel Lock (Elite)',
            category: 'Access Control',
            price: 299.00,
            stock: 0,
            status: 'Out of Stock',
        },
        {
            key: '3',
            name: 'Encrypted Access Pad Plus',
            category: 'Authentication',
            price: 149.00,
            stock: 120,
            status: 'In Stock',
        },
    ]);

    const showModal = (product = null) => {
        setEditingProduct(product);
        if (product) {
            form.setFieldsValue(product);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
    };

    const handleSave = (values) => {
        const status = values.stock > 0 ? 'In Stock' : 'Out of Stock';
        const newProduct = { ...values, status };

        if (editingProduct) {
            setProducts(products.map(p => p.key === editingProduct.key ? { ...newProduct, key: p.key } : p));
            message.success(t('products.messages.updated'));
        } else {
            const key = Date.now().toString();
            setProducts([...products, { ...newProduct, key }]);
            message.success(t('products.messages.added'));
        }
        setIsModalVisible(false);
    };

    const handleDelete = (key) => {
        setProducts(products.filter(p => p.key !== key));
        message.success(t('products.messages.deleted'));
    };

    const columns = [
        {
            title: t('products.table.asset'),
            key: 'image',
            width: 100,
            render: (_, record) => (
                <div style={{
                    width: 45,
                    height: 45,
                    background: '#f1f5f9',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                    fontWeight: 'bold'
                }}>
                    {record.name.charAt(0)}
                </div>
            ),
        },
        {
            title: t('products.table.details'),
            key: 'details',
            render: (_, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong style={{ color: '#1a1a1a' }}>{record.name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{record.category}</Text>
                </div>
            )
        },
        {
            title: t('products.table.price'),
            dataIndex: 'price',
            key: 'price',
            render: (price) => <Text strong>${price ? price.toFixed(2) : '0.00'}</Text>
        },
        {
            title: t('products.table.inventory'),
            dataIndex: 'stock',
            key: 'stock',
            render: (stock) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text style={{ fontSize: 13, fontWeight: 500 }}>{stock} Units</Text>
                    <div style={{ width: 60, height: 4, background: '#f1f5f9', borderRadius: 2 }}>
                        <div style={{
                            width: `${Math.min(stock, 100)}%`,
                            height: '100%',
                            background: stock < 10 ? '#ef4444' : '#D4AF37',
                            borderRadius: 2
                        }} />
                    </div>
                </div>
            )
        },
        {
            title: t('products.table.status'),
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <Tag
                    className="status-tag"
                    color={status === 'In Stock' ? 'success' : 'error'}
                >
                    {status.toUpperCase()}
                </Tag>
            ),
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
                    <Popconfirm
                        title={t('products.modal.delete_confirm')}
                        onConfirm={() => handleDelete(record.key)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                    >
                        <Button type="text" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredData = products.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
    );

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
                    <Button icon={<ExportOutlined />} style={{ borderRadius: 8 }}>{t('products.export')}</Button>
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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ maxWidth: 450, borderRadius: 10 }}
                    />
                    <Button icon={<FilterOutlined />} style={{ borderRadius: 8 }}>{t('products.filters')}</Button>
                </div>
            </Card>

            <div className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 6 }}
                    rowKey="key"
                />
            </div>

            <Modal
                title={editingProduct ? t('products.modal.edit') : t('products.modal.add')}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={480}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{ category: 'Surveillance', stock: 0, price: 0 }}
                    style={{ paddingTop: 20 }}
                    size="large"
                >
                    <Form.Item
                        name="name"
                        label={t('products.modal.name')}
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Input placeholder="e.g. Laser Motion Sensor" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label={t('products.modal.category')}
                        rules={[{ required: true, message: 'Required' }]}
                    >
                        <Select>
                            <Option value="Surveillance">Surveillance</Option>
                            <Option value="Access Control">Access Control</Option>
                            <Option value="Authentication">Authentication</Option>
                            <Option value="Sensors">Sensors</Option>
                        </Select>
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item name="price" label={t('products.modal.price')} style={{ flex: 1 }}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item name="stock" label={t('products.modal.stock')} style={{ flex: 1 }}>
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                    </div>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>{t('products.modal.cancel')}</Button>
                            <Button type="primary" htmlType="submit">
                                {editingProduct ? t('products.modal.save') : t('products.modal.create')}
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
