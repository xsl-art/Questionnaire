import { type FC } from 'react';
import { RegisterWrapper } from './style';
import { Space, Form, Typography, Input, Button, message } from 'antd';
import { UserAddOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { registerService } from '@/api';

const { Title } = Typography;
const Register: FC = () => {
  const navigate = useNavigate();
  const { run: handleRegister } = useRequest(
    async values => {
      console.log(values);
      const { username, password, nickname } = values;
      await registerService({ username, password, nickname });
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功');
        navigate('/login');
      },
    }
  );
  const onFinish = (value: any) => {
    console.log(value);
    handleRegister(value);
  };
  return (
    <RegisterWrapper>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册新用户</Title>
      </Space>
      <div className="register">
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 8,
                max: 15,
                message: '用户名长度需8到15个字符',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              {
                type: 'string',
                min: 8,
                max: 15,
                message: '密码长度需8到15个字符',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue('password')) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('两次密码不一致'));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to="/login" className="login-link">
                已有账号跳转登录
                <ArrowRightOutlined />
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </RegisterWrapper>
  );
};

export default Register;
