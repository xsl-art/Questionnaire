import { useEffect, useState, type FC } from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getStatisticsDetailService } from '@/api';
import { useParams } from 'react-router-dom';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';

const { Title } = Typography;
type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStatistics: FC<PropsType> = ({ selectedComponentId, selectedComponentType }) => {
  const { id = '' } = useParams();
  const [stat, setStat] = useState([]);

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
  }, [id, selectedComponentId]);

  function generateChartComponent() {
    if (!selectedComponentId) return <div>请选择组件</div>;
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {};
    if (!StatComponent) return <div>该组件不存在统计图表</div>;
    return <StatComponent stat={stat} />;
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{generateChartComponent()}</div>
    </>
  );
};

export default ChartStatistics;
