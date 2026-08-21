import { useState, type FC } from 'react';
import { StatWrapper } from './style';
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData';
import { Button, Drawer, Result, Spin } from 'antd';
import { usePageInfo } from '@/hooks/usePageInfo';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { MenuOutlined, PieChartOutlined } from '@ant-design/icons';
import StatisticsHeader from './StatisticsHeader';
import ComponentList from './ComponentList';
import PageStatistics from './PageStatistics';
import ChartStatistics from './ChartStatistics';
import { useCustomStyle } from '@/hooks/useSyncCustomStyle';
import { STAT_SCOPE_ID } from '@/constants';

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();
  const { title, isPublished, css } = usePageInfo();
  const { injectCustomCss } = useCustomStyle();
  const nav = useNavigate();

  injectCustomCss(css, STAT_SCOPE_ID);

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

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
        <div className="toolbar" style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
          <Button icon={<MenuOutlined />} onClick={() => setLeftDrawerOpen(true)}>
            组件列表
          </Button>
          <Button
            icon={<PieChartOutlined />}
            onClick={() => setRightDrawerOpen(true)}
            disabled={!selectedComponentId}
          >
            图表统计
          </Button>
        </div>
        <div className="main">
          <PageStatistics
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={id => {
              setSelectedComponentId(id);
            }}
            setSelectedComponentType={type => {
              setSelectedComponentType(type);
            }}
            onColumnClick={() => setRightDrawerOpen(true)}
          />
        </div>

        <Drawer
          title="组件列表"
          placement="left"
          width={380}
          open={leftDrawerOpen}
          onClose={() => setLeftDrawerOpen(false)}
          styles={{ body: { padding: 12 } }}
        >
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={id => {
              setSelectedComponentId(id);
              setLeftDrawerOpen(false);
            }}
            setSelectedComponentType={setSelectedComponentType}
          />
        </Drawer>

        <Drawer
          title="图表统计"
          placement="right"
          width={480}
          open={rightDrawerOpen}
          onClose={() => setRightDrawerOpen(false)}
          styles={{ body: { padding: 12 } }}
        >
          <ChartStatistics
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </Drawer>
      </>
    );
  }

  return (
    <StatWrapper id={STAT_SCOPE_ID}>
      <StatisticsHeader />
      <div className="content-wrapper">
        {loading && LoadingELement}
        {!loading && <div className="content">{genContentElement()}</div>}
      </div>
    </StatWrapper>
  );
};

export default Stat;
