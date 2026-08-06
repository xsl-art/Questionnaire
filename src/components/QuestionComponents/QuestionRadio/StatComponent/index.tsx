import { useMemo, type FC } from 'react';
const STAT_COLORS = ['#FF2D2D', '#BE77FF', '#2894FF', '#00EC00', '#EAC100', '#FF9D6F'];
import { type QuestionRadioStatisticsProps } from '../types';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

function format(num: number) {
  return (num * 100).toFixed(2);
}

const ChartComponent: FC<QuestionRadioStatisticsProps> = ({ stat }) => {
  const sum = useMemo(() => stat.reduce((pre, cur) => pre + cur.count, 0), [stat]);

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={50} // 饼图的直径
            fill="#8884d8"
            label={(i: any) => `${i.name}: ${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
