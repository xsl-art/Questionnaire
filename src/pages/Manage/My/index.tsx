import { type FC } from 'react';
import List from '@/components/List';

import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData';
import { MyWrapper } from './style';
import { Empty, Spin } from 'antd';
import { useLoadUserData } from '@/hooks/useLoadUserInfoData';

const My: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;
  //保存登录信息
  useLoadUserData();

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
