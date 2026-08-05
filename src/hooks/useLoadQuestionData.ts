import { getQuestionService } from '@/api';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetComponents } from '@/store/componentsStore/componentsReducer';
import { resetPageInfo } from '@/store/pageInfoStore/pageInfoReducer';

export const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) return;
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  //保存
  useEffect(() => {
    if (!data) return;
    const { title = '', desc = '', js = '', css = '', componentList = [] } = data;

    //获取默认选中id
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    //存储componentList到store
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
    //保存pageInfo到store
    dispatch(resetPageInfo({ title, desc, js, css }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
};
