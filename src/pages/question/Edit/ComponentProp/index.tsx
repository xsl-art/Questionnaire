import { type FC } from 'react';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import {
  getComponentConfigByType,
  type ComponentPropsType,
} from '@/components/QuestionComponents/type';
import { updateComponent } from '@/store/componentsStore/componentsReducer';
import { useDispatch } from 'react-redux';
const NoSelected: FC = () => {
  return <div style={{ textAlign: 'center' }}>暂未选择组件</div>;
};
const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useComponentInfo();
  if (selectedComponent == null) return <NoSelected />;

  const { type, props, isLocked, isHidden } = selectedComponent!;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig === null) return <NoSelected />;
  const { PropComponent } = componentConfig!;

  const handleChange = (newProps: ComponentPropsType) => {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    //console.log('组件属性变化', fe_id, newProps);
    dispatch(updateComponent({ fe_id, newProps }));
  };

  return <PropComponent {...props} onChange={handleChange} disabled={isLocked || isHidden} />;
};

export default ComponentProp;
