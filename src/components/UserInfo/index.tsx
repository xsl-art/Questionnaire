import type { FC } from 'react';
import { Button, message } from 'antd';
import { UserInfoWrapper } from './style';
import { Link, useNavigate } from 'react-router-dom';
import useUserInfo from '@/hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '@/store/userStore/userReducer';

const UserInfo: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, nickname } = useUserInfo();
  const isLogined = !!username;

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserInfo());
    message.success('退出登录成功');
    navigate('/login');
  };
  return (
    <UserInfoWrapper>
      {isLogined ? (
        <div className="user-info">
          <div className="avatar" onClick={() => logout()} title="退出登录">
            {(nickname || username)?.charAt(0)}
          </div>
        </div>
      ) : (
        <Link to="/login">
          <Button type="primary" size="large">
            登录
          </Button>
        </Link>
      )}
    </UserInfoWrapper>
  );
};

export default UserInfo;
