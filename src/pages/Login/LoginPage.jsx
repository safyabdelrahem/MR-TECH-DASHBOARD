import React from 'react';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLoginLogic } from './logic';
import logo from '../../assets/logo.png';
import heroImage from '../../assets/heroImage.png';

const { Title, Text } = Typography;

const LoginPage = () => {
    const { t } = useTranslation();
    const { state, handleFinish } = useLoginLogic(t);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            background: '#fff',
            overflow: 'hidden'
        }}>
            {/* Left Side: Hero Image & Branding */}
            <div style={{
                flex: 1.2,
                position: 'relative',
                display: window.innerWidth < 900 ? 'none' : 'block'
            }}>
                {/* Background Image with Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '10% 50%',
                    animation: 'kenBurns 20s ease-out infinite alternate',
                    transformOrigin: 'center'
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)',
                    zIndex: 2
                }} />

                {/* Decorative Grid overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    opacity: 0.3,
                    zIndex: 3
                }} />

                {/* Content on top of image */}
                <div style={{
                    position: 'relative',
                    zIndex: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: '#fff',
                    padding: '80px',
                    boxSizing: 'border-box'
                }}>
                    <div className="animate-fade-in-up">
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '16px 24px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                        }}>
                            <img
                                src={logo}
                                alt="MR-TECH"
                                style={{
                                    width: '120px',
                                    objectFit: 'contain',
                                    mixBlendMode: 'multiply'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ maxWidth: '540px' }} className="animate-fade-in-up delay-1">

                        <Title level={1} style={{ color: '#fff', fontWeight: 800, fontSize: '56px', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-1px' }}>
                            Uncompromising <br />
                            <span style={{ color: 'var(--primary-gold)' }}>Security Engine</span>.
                        </Title>
                        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: '20px', display: 'block', marginBottom: '40px', fontWeight: 300, lineHeight: 1.6 }}>
                            Elevate your command center with military-grade asset tracking and real-time operational intel.
                        </Text>

                        <Space size="large" style={{ background: 'rgba(0,0,0,0.4)', padding: '24px 40px', borderRadius: '16px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Divider type="vertical" style={{ background: 'rgba(255,255,255,0.1)', height: '36px' }} />
                        </Space>
                    </div>

                    <div className="animate-fade-in-up delay-2" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 500, letterSpacing: '1px' }}>
                        © {new Date().getFullYear()} {t('login.footer')}
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div style={{
                flex: 1,
                minWidth: '400px',
                maxWidth: '650px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 8%',
                background: '#fff',
                boxShadow: '-20px 0 50px rgba(0,0,0,0.05)',
                zIndex: 10
            }}>
                <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
                    <div className="animate-fade-in-up" style={{ marginBottom: '48px' }}>
                        <Title level={2} style={{ fontWeight: 800, marginBottom: '12px', color: '#0f172a', fontSize: '36px', letterSpacing: '-1px' }}>
                            {t('login.title')}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '16px', color: '#64748b', fontWeight: 400 }}>
                            {t('login.subtitle')}
                        </Text>
                    </div>

                    <Form
                        name="login_form"
                        layout="vertical"
                        onFinish={handleFinish}
                        requiredMark={false}
                        size="large"
                    >
                        <div className="animate-fade-in-up delay-1">
                            <Form.Item
                                name="email"
                                label={<Text strong style={{ fontSize: '13px', color: '#334155', letterSpacing: '0.5px' }}>{t('login.email_label')}</Text>}
                                rules={[
                                    { required: true, message: t('login.required_email') },
                                    { type: 'email', message: 'Invalid email' }
                                ]}
                            >
                                <Input
                                    className="premium-input-wrapper"
                                    prefix={<MailOutlined style={{ color: '#94a3b8', fontSize: '18px', marginRight: '6px' }} />}
                                    placeholder={t('login.email_placeholder')}
                                    style={{ height: '56px', fontSize: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                />
                            </Form.Item>
                        </div>

                        <div className="animate-fade-in-up delay-2">
                            <Form.Item
                                name="password"
                                label={<Text strong style={{ fontSize: '13px', color: '#334155', letterSpacing: '0.5px' }}>{t('login.password_label')}</Text>}
                                rules={[{ required: true, message: t('login.required_password') }]}
                            >
                                <Input.Password
                                    className="premium-input-wrapper"
                                    prefix={<LockOutlined style={{ color: '#94a3b8', fontSize: '18px', marginRight: '6px' }} />}
                                    placeholder={t('login.password_placeholder')}
                                    style={{ height: '56px', fontSize: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}
                                />
                            </Form.Item>
                        </div>

                        <div className="animate-fade-in-up delay-4">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={state.loading}
                                    style={{
                                        height: '60px',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        letterSpacing: '0.5px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {t('login.submit')} {!state.loading && <ArrowRightOutlined />}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                </div>
            </div>

            {/* Dynamic keyframe added here to ensure Ken Burns effect works effortlessly */}
            <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
        </div>
    );
};

export default LoginPage;
