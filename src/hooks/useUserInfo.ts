import { useSelector } from 'react-redux';
import type { StateType } from '../store/index';
import type { UserStateType } from '@/store/userReducer';

const useUserInfo = () => {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType;
  return { username, nickname };
};

export default useUserInfo;
