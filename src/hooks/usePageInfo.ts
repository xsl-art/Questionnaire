import { useSelector } from 'react-redux';
import { type StateType } from '@/store';
import { type PageInfoType } from '@/store/pageInfoStore/pageInfoReducer';
export const usePageInfo = () => {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;

  return pageInfo;
};
