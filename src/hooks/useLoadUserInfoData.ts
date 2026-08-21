//获取用户信息
import { useEffect } from 'react';
import useUserInfo from './useUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '@/api';
import { setUserInfo } from '@/store/userStore/userReducer';
import { useDispatch } from 'react-redux';
export const useLoadUserData = () => {
  const dispatch = useDispatch();
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: res => {
      const { username, nickname } = res;
      //保存
      dispatch(setUserInfo({ username, nickname }));
    },
  });

  const { username } = useUserInfo();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (username) {
      return;
    } else {
      run();
    }
  }, [username, run]);
};
