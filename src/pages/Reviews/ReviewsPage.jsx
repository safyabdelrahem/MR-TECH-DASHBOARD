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
    Rate
} from 'antd';
import {
    SearchOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useReviewsLogic } from './logic';

const { Title, Text } = Typography;

const ReviewsPage = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const {
        state,
        showModal,
        handleCancel,
        handleSave,
        handleTableChange,
        onFilterChange
    } = useReviewsLogic(form, t);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'gold';
            case 'approved': return 'green';
            case 'rejected': return 'red';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: t('reviews.table.product'),
            key: 'product_name',
            render: (_, record) => <Text strong>{record.product?.name || t('reviews.table.unknown_product')}</Text>
        },
        {
            title: t('reviews.table.customer'),
            key: 'customer_name',
            render: (_, record) => <Text>{record.user_name || t('reviews.table.customer')}</Text>
        },
        {
            title: t('reviews.table.rating'),
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
        },
        {
            title: t('reviews.table.comment'),
            dataIndex: 'comment',
            key: 'comment',
            width: '30%',
            render: (comment) => <Text type="secondary">{comment}</Text>
        },
        {
            title: t('reviews.table.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={getStatusColor(status)} style={{ textTransform: 'uppercase', borderRadius: 4 }}>
                    {status || 'PENDING'}
                </Tag>
            )
        },
        {
            title: t('reviews.table.date'),
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => <Text type="secondary">{date ? new Date(date).toLocaleDateString() : '-'}</Text>
        },
        {
            title: t('reviews.table.operations'),
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={t('reviews.modal.update_status')}>
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
                        {t('reviews.title')}
                    </Title>
                    <Text type="secondary">{t('reviews.subtitle')}</Text>
                </div>
            </div>

            <Card className="premium-card" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <Input
                        placeholder={t('reviews.filters.customer_name')}
                        size="large"
                        value={state.customerFilter}
                        onChange={(e) => onFilterChange('customerFilter', e.target.value)}
                        style={{ flex: 1, minWidth: 200, borderRadius: 10 }}
                    />
                    <Input
                        placeholder={t('reviews.filters.product_name')}
                        size="large"
                        value={state.productFilter}
                        onChange={(e) => onFilterChange('productFilter', e.target.value)}
                        style={{ flex: 1, minWidth: 200, borderRadius: 10 }}
                    />
                    <Select
                        placeholder={t('reviews.filters.status')}
                        size="large"
                        value={state.statusFilter}
                        onChange={(value) => onFilterChange('statusFilter', value)}
                        style={{ width: 180 }}
                        allowClear
                    >
                        <Select.Option value="pending">{t('reviews.status.pending')}</Select.Option>
                        <Select.Option value="approved">{t('reviews.status.approved')}</Select.Option>
                        <Select.Option value="rejected">{t('reviews.status.rejected')}</Select.Option>
                    </Select>
                </div>
            </Card>

            <div className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                <Table
                    columns={columns}
                    dataSource={state.reviews}
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
                title={t('reviews.modal.update_status')}
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
                        label={t('reviews.modal.status')}
                        rules={[{ required: true, message: t('reviews.modal.required') }]}
                    >
                        <Select>
                            <Select.Option value="approved">{t('reviews.status.approved')}</Select.Option>
                            <Select.Option value="rejected">{t('reviews.status.rejected')}</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: 24, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={handleCancel}>{t('reviews.modal.cancel')}</Button>
                            <Button type="primary" htmlType="submit" loading={state.loading}>
                                {t('reviews.modal.save')}
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

export default ReviewsPage;
