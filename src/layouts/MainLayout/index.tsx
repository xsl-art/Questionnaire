import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { MainLayoutWrapper } from './style';
import Logo from '../../components/Logo/index';
import UserInfo from '@/components/UserInfo';
const { Header, Content } = Layout;
const MainLayout: FC = () => {
  return (
    <MainLayoutWrapper>
      <Header className="header">
        <Logo />
        <UserInfo />
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
