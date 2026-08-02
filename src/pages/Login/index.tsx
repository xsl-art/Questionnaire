import { useEffect, type FC } from 'react';
import { LoginWrapper } from './style';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { loginService } from '@/api';

const { Title } = Typography;

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};

const deleteUser = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

const getUserInfo = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserInfo();
    form.setFieldsValue({
      username,
      password,
    });
  }, [form]);

  const { run: handleLogin } = useRequest(
    async values => {
      console.log(values);
      const res = await loginService(values);
      return res;
    },
    {
      manual: true,
      onSuccess: res => {
        message.success('登录成功');
        navigate('/home');
        const token = res.token;
        console.log('token', token);
        localStorage.setItem('token', token);
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password } = values;
    handleLogin(values);
    if (values.remember) {
      rememberUser(username, password);
    } else {
      deleteUser();
    }
  };
  return (
    <LoginWrapper>
      <Space>
        <Title level={2}>
          <UserOutlined />
        </Title>
        <Title level={2}>登录</Title>
      </Space>
      <div className="login">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
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
          <Form.Item label="记住密码" name="remember" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register" className="register-link">
                <ArrowRightOutlined />
                前往注册
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  );
};

export default Login;
