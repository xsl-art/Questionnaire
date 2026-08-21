import { useEffect, useMemo, useState, type FC } from 'react';
import { Empty, Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getStatisticsDetailService } from '@/api';
import { useParams } from 'react-router-dom';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { type OptionType } from '@/components/QuestionComponents/QuestionCheckbox/types';

const { Title, Text } = Typography;

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStatistics: FC<PropsType> = ({ selectedComponentId, selectedComponentType }) => {
  const { id = '' } = useParams();
  const [stat, setStat] = useState([]);

  const { componentList } = useComponentInfo();
  const selectedComponent = useMemo(
    () => componentList.find(item => item.fe_id === selectedComponentId),
    [componentList, selectedComponentId]
  );
  const selectedTitle = selectedComponent
    ? (selectedComponent.props as { title?: string }).title || selectedComponent.title
    : '';

  const { run } = useRequest(
    async () => await getStatisticsDetailService(id, selectedComponentId),
    {
      manual: true,
      onSuccess: res => {
        setStat(res.stat);
      },
    }
  );

  useEffect(() => {
    if (selectedComponentId) {
      run();
    }
  }, [id, selectedComponentId, run]);

  function generateChartComponent() {
    if (!selectedComponentId) {
      return (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
          请在左侧或表格中选择要查看的组件
        </div>
      );
    }

    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {};
    if (!StatComponent) {
      return (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#999' }}>
          该组件类型暂无图表统计
        </div>
      );
    }

    if (!stat || stat.length === 0) {
      return <Empty description="暂无数据" />;
    }

    const statProps = {
      stat,
      options: (selectedComponent?.props as { options?: OptionType[] }).options,
      list: (selectedComponent?.props as { list?: OptionType[] }).list,
    };

    return <StatComponent {...statProps} />;
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      {selectedComponentId && (
        <Text type="secondary">
          当前统计字段：<Text strong>{selectedTitle}</Text>
        </Text>
      )}
      <div style={{ marginTop: 16 }}>{generateChartComponent()}</div>
    </>
  );
};

export default ChartStatistics;
