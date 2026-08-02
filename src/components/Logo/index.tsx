import { type FC } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { LogoWrapper } from './style';
import { Link } from 'react-router-dom';
import useUserInfo from '@/hooks/useUserInfo';
const Logo: FC = () => {
  const { Title } = Typography;
  const { username } = useUserInfo();

  const pathname = username ? '/manage/my' : '/login';
  return (
    <LogoWrapper>
      <Link to={pathname}>
        <Space>
          <Title className="logo-icon">
            <FormOutlined style={{ fontSize: 34, paddingBottom: 8 }} />
          </Title>
          <Title className="logo-title">问卷系统</Title>
        </Space>
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
