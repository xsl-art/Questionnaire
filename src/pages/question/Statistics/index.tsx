import { useState, type FC } from 'react';
import { StatWrapper } from './style';
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';
import { Button, Result, Spin } from 'antd';
import { usePageInfo } from '@/hooks/usePageInfo';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import StatisticsHeader from './StatisticsHeader';
import ComponentList from './ComponentList';
import PageStatistics from './PageStatistics';
import ChartStatistics from './ChartStatistics';

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title, isPublished } = usePageInfo();
  const nav = useNavigate();

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  useTitle(`问卷调查-${title}`);

  // loading 效果
  const LoadingELement = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  );

  function genContentElement() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className="left">
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="main">
          <PageStatistics
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="right">
          <ChartStatistics
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <StatWrapper>
      <StatisticsHeader />
      <div className="content-wrapper">
        {loading && LoadingELement}
        {!loading && <div className="content">{genContentElement()}</div>}
      </div>
    </StatWrapper>
  );
};

export default Stat;
