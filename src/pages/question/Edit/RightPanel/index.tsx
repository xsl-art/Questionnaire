import { type FC } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { RightPanelWrapper } from './style';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from '../ComponentProp';
import PageSetting from './PageSetting';
import { useComponentInfo } from '@/hooks/useComponentInfo';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const items: TabsProps['items'] = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: '属性',
    icon: <FileTextOutlined />,
    children: <ComponentProp />,
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: '页面设置',
    icon: <SettingOutlined />,
    children: <PageSetting />,
  },
];
const RightPanel: FC = () => {
  const { selectedId } = useComponentInfo();
  const activeKey = selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY;

  return (
    <RightPanelWrapper>
      <Tabs activeKey={activeKey} items={items} />
    </RightPanelWrapper>
  );
};

export default RightPanel;
