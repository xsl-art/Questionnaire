import { type FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';

import { type QuestionCheckboxStatisticsProps } from '../types';

const STAT_COLORS = [
  '#1677ff',
  '#52c41a',
  '#faad14',
  '#f5222d',
  '#722ed1',
  '#13c2c2',
  '#eb2f96',
  '#fa8c16',
];

function getOptionText(value: string, list?: Array<{ value: string; text: string }>) {
  return list?.find(item => item.value === value)?.text ?? value;
}

const ChartComponent: FC<QuestionCheckboxStatisticsProps> = ({ stat, list }) => {
  // 把 value 映射成选项 text
  const chartData = stat.map(item => ({
    ...item,
    name: getOptionText(item.name, list),
  }));

  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={chartData.length > 5 ? 30 : 0}
            textAnchor={chartData.length > 5 ? 'start' : 'middle'}
            height={chartData.length > 5 ? 60 : 30}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value: number, name: string) => [value, name]}
            labelFormatter={(label: string) => `选项：${label}`}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="count" position="top" />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={STAT_COLORS[index % STAT_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
