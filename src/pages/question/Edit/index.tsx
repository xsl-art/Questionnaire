import { type FC } from 'react';
import { EditWrapper } from './style';
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';
const Edit: FC = () => {
  const { data, loading } = useLoadQuestionData();
  return <EditWrapper>{loading ? '加载中' : data?.title || ''}</EditWrapper>;
};

export default Edit;
