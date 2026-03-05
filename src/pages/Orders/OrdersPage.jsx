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
    Select,
    Tag,
    Badge
} from 'antd';
import {
    SearchOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useOrdersLogic } from './logic';

const { Title, Text } = Typography;

const OrdersPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const {
        state,
        showModal,
        handleCancel,
        handleSave,
        handleTableChange,
        onFilterChange
    } = useOrdersLogic(form, t);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'gold';
            case 'processing': return 'blue';
            case 'shipped': return 'cyan';
            case 'delivered': return 'green';
            case 'cancelled': return 'red';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: t('orders.table.id'),
            dataIndex: 'id',
            key: 'id',
            render: (id) => <Text strong>#{id}</Text>
        },
        {
            title: t('orders.table.customer'),
            key: 'customer',
            render: (_, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong>{record.user ? `${record.user.first_name} ${record.user.last_name}` : t('orders.table.unknown_customer')}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{record.user?.email}</Text>
                </div>
            )
        },
        {
            title: t('orders.table.total'),
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: (amount) => <Text strong>${Number(amount || 0).toFixed(2)}</Text>
        },
        {
            title: t('orders.table.items'),
            key: 'items',
            render: (_, record) => (
                <Badge count={record.products?.length || 0} color="#D4AF37">
                    <Text type="secondary" style={{ padding: '0 8px' }}>
                        {record.products?.length === 1
                            ? record.products[0].name
                            : `${record.products?.length || 0} ${t('orders.table.units')}`}
                    </Text>
                </Badge>
            )
        },
        {
            title: t('orders.table.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)} style={{ textTransform: 'uppercase', borderRadius: 4 }}>
                    {status || 'PENDING'}
                </Tag>
            )
        },
        {
            title: t('orders.table.date'),
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => <Text type="secondary">{date ? new Date(date).toLocaleDateString() : '-'}</Text>
        },
        {
            title: t('orders.table.operations'),
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={t('orders.modal.edit_status')}>
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

    return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0, fontWeight: 800 }}>
                        {t('orders.title')}
                    </Title>
                    <Text type="secondary">{t('orders.subtitle')}</Text>
                </div>
            </div>

            <Card className="premium-card" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <Input
                        placeholder={t('orders.filters.customer_name')}
                        size="large"
                        value={state.customerFilter}
                        onChange={(e) => onFilterChange('customerFilter', e.target.value)}
                        style={{ flex: 1, minWidth: 200, borderRadius: 10 }}
                    />
                    <Input
                        placeholder={t('orders.filters.product_name')}
                        size="large"
                        value={state.productFilter}
                        onChange={(e) => onFilterChange('productFilter', e.target.value)}
                        style={{ flex: 1, minWidth: 200, borderRadius: 10 }}
                    />
                    <Select
                        placeholder={t('orders.filters.status')}
                        size="large"
                        value={state.statusFilter}
                        onChange={(value) => onFilterChange('statusFilter', value)}
                        style={{ width: 180 }}
                        allowClear
                    >
                        <Select.Option value="pending">{t('orders.status.pending')}</Select.Option>
                        <Select.Option value="shipped">{t('orders.status.shipped')}</Select.Option>
                        <Select.Option value="cancelled">{t('orders.status.cancelled')}</Select.Option>
                    </Select>
                </div>
            </Card>

            <div className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                <Table
                    columns={columns}
                    dataSource={state.orders}
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
                title={t('orders.modal.update_status')}
                open={state.isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={400}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    style={{ paddingTop: 20 }}
                    size="large"
                >
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label={t('orders.modal.status')}
                        rules={[{ required: true, message: t('orders.modal.required') }]}
                    >
                        <Select>
                            <Select.Option value="shipped">{t('orders.status.shipped')}</Select.Option>
                            <Select.Option value="cancelled">{t('orders.status.cancelled')}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>{t('orders.modal.cancel')}</Button>
                            <Button type="primary" htmlType="submit" loading={state.loading}>
                                {t('orders.modal.save')}
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

export default OrdersPage;
