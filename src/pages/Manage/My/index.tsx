import { type FC } from 'react';
import List from '@/components/List';

import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData';
import { MyWrapper } from './style';
import { Empty, Spin } from 'antd';

const My: FC = () => {
  /*  const [myList, setMyList] = useState<ListProps[]>([]);
  const [total, setTotal] = useState<number>(0); */

  const { data = {}, loading } = useLoadQuestionListData();

  const { list = [], total = 0 } = data;

  /*   useEffect(() => {
    getQuestionListService().then(res => {
      const { list = [], total = 0 } = res;
      setMyList(list.slice(0, 6));
      setTotal(total);
    });
  }); */
  return (
    <MyWrapper>
      {loading && (
        <div className="loading">
          <Spin />
        </div>
      )}
      {list.length > 0 && <List list={list} option={{ total }} />}
      {!loading && list.length === 0 && <Empty description="暂无问卷" />}
    </MyWrapper>
  );
};

export default My;
