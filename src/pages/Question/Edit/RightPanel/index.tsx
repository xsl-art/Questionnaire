import { useEffect, useState, type FC } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { RightPanelWrapper } from './style';
import { CompressOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from '../ComponentProp';
import PageSetting from './PageSetting';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import ShowCondition from './ShowCondition';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
  CONDITION_KEY = 'condition',
}

const RightPanel: FC = () => {
  const { selectedId } = useComponentInfo();
  const [activeKey, setActiveKey] = useState(TAB_KEYS.SETTING_KEY as string);

  // 选中组件变化时自动切换到属性/页面设置标签
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveKey(selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

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
    {
      key: TAB_KEYS.CONDITION_KEY,
      label: '显示条件',
      icon: <CompressOutlined />,
      children: <ShowCondition key={selectedId} />,
    },
  ];

  const handleChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <RightPanelWrapper>
      <Tabs activeKey={activeKey} items={items} onChange={handleChange} />
    </RightPanelWrapper>
  );
};

export default RightPanel;
