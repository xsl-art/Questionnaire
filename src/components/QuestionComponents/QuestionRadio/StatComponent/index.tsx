import { useMemo, type FC } from 'react';
import { type QuestionRadioStatisticsProps } from '../types';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// 更柔和的统计色板
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

function formatPercent(num: number) {
  return `${(num * 100).toFixed(2)}%`;
}

function getOptionText(value: string, options?: Array<{ value: string; text: string }>) {
  return options?.find(opt => opt.value === value)?.text ?? value;
}

const ChartComponent: FC<QuestionRadioStatisticsProps> = ({ stat, options }) => {
  const sum = useMemo(() => stat.reduce((pre, cur) => pre + cur.count, 0), [stat]);

  // 把 value 映射成选项 text，方便阅读
  const chartData = useMemo(
    () =>
      stat.map(item => ({
        ...item,
        name: getOptionText(item.name, options),
      })),
    [stat, options]
  );

  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            nameKey="name"
            data={chartData}
            cx="40%"
            cy="50%"
            outerRadius={90}
            innerRadius={40}
            label={entry => `${entry.name}: ${entry.count} (${formatPercent(entry.count / sum)})`}
          >
            {chartData.map((_i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index % STAT_COLORS.length]} />;
            })}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} (${formatPercent(value / sum)})`,
              name,
            ]}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{ paddingLeft: 16 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
