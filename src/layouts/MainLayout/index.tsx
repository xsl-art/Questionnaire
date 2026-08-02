import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { MainLayoutWrapper } from './style';
import Logo from '../../components/Logo/index';
import UserInfo from '@/components/UserInfo';
const { Header, Content, Footer } = Layout;
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
      <Footer className="footer">底部</Footer>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
