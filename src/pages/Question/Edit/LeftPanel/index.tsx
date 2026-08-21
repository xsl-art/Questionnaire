import { type FC } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { LeftPanelWrapper } from './style';
import { AppstoreTwoTone, UnorderedListOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';
import ComponentLayer from './ComponentLayer';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '组件库',
    icon: <AppstoreTwoTone />,
    children: <ComponentLib />,
  },
  {
    key: '2',
    label: '图层',
    icon: <UnorderedListOutlined />,
    children: <ComponentLayer />,
  },
];
const LeftPanel: FC = () => {
  return (
    <LeftPanelWrapper>
      <Tabs defaultActiveKey="1" items={items} />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
