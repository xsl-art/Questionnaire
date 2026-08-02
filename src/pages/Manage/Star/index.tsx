import { type FC } from 'react';
import List from '@/components/List';
import { Empty, Spin } from 'antd';
import { StarWrapper } from './style';
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData';

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <StarWrapper>
      {loading && (
        <div className="loading">
          <Spin />
        </div>
      )}
      {list.length > 0 && <List list={list} option={{ total }} />}
      {!loading && list.length === 0 && <Empty className="empty" description="暂无数据" />}
    </StarWrapper>
  );
};

export default Star;
