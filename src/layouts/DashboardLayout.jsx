import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Button, Divider, Select } from 'antd';
import {
    ShoppingOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const menuItems = [
        {
            key: '/',
            icon: <ShoppingOutlined />,
            label: t('sidebar.inventory'),
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: t('sidebar.logout'),
            danger: true,
            onClick: logout,
        },
    ];

    const handleMenuClick = (info) => {
        if (info.key !== 'logout') {
            navigate(info.key);
        }
    };

    const userMenuItems = [
        {
            key: 'logout',
            label: t('header.sign_out'),
            icon: <LogoutOutlined />,
            danger: true,
            onClick: logout,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={280}
                theme="dark"
                style={{
                    background: 'var(--bg-sidebar)',
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    zIndex: 100
                }}
            >
                <div style={{
                    height: 160,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '10px'
                }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: collapsed ? 45 : 100,
                            width: collapsed ? 45 : 100,
                            objectFit: 'contain',
                            transition: 'all 0.3s'
                        }}
                    />
                    {!collapsed && (
                        <span style={{
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: 20,
                            letterSpacing: 1,
                            whiteSpace: 'nowrap'
                        }}>
                            MR-TECH
                        </span>
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ paddingTop: 10, background: 'transparent' }}
                />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s', background: '#f8fafc' }}>
                <Header className="glass-header" style={{
                    padding: '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 99,
                    height: 70
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '18px', color: '#64748b' }}
                    />

                    <Space size={24}>
                        {/* Language Switcher */}
                        <Select
                            defaultValue={i18n.language}
                            style={{ width: 120 }}
                            onChange={changeLanguage}
                            suffixIcon={<GlobalOutlined style={{ color: 'var(--primary-gold)' }} />}
                            bordered={false}
                            className="lang-select"
                        >
                            <Select.Option value="en">English</Select.Option>
                            <Select.Option value="nl">Dutch (NL)</Select.Option>
                        </Select>

                        <Divider type="vertical" style={{ height: 20 }} />

                        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar
                                    size="small"
                                    style={{
                                        backgroundColor: 'var(--primary-gold)',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {user?.name?.charAt(0) || 'A'}
                                </Avatar>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                                    <Text style={{ color: '#1a1a1a', fontSize: 13, fontWeight: 600 }}>{user?.name}</Text>
                                    <Text type="secondary" style={{ fontSize: 11 }}>{user?.role}</Text>
                                </div>
                                <DownOutlined style={{ color: '#64748b', fontSize: 10 }} />
                            </Space>
                        </Dropdown>
                    </Space>
                </Header>

                <Content style={{ padding: '32px', minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>

            <style>{`
                .lang-select .ant-select-selection-item {
                    color: #475569 !important;
                    font-weight: 500 !important;
                }
            `}</style>
        </Layout>
    );
};

export default DashboardLayout;
