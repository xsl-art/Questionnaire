import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '@/api';

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
export const useLoadQuestionListData = (option: Partial<OptionType> = {}) => {
  const { isStar = false, isDeleted = false } = option;

  const [searchParams] = useSearchParams();

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get('keyword') || '';
      const page = Number(searchParams.get('page')) || 1;
      const pageSize = Number(searchParams.get('pageSize')) || 6;
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
      console.log('关键词', data);
      return data;
    },
    {
      refreshDeps: [searchParams], //依赖searchParams变化
    }
  );
  return { data, loading, error, refresh };
};
