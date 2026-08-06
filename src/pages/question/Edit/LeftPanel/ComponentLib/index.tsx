import { useCallback, type FC } from 'react';
import {
  questionComponentGroupList,
  type QuestionComponentConfig,
} from '@/components/QuestionComponents/type';
import { Typography } from 'antd';
import { ComponentLibWrapper } from './style';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addComponent } from '@/store/componentsStore/componentsReducer';

const { Title } = Typography;

interface ComponentItemProps {
  component: QuestionComponentConfig<any>;
}

const ComponentItem: FC<ComponentItemProps> = ({ component }) => {
  const { title, type, Component, defaultProps } = component;
  const dispatch = useDispatch();

  const handleAddComponent = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }, [dispatch, title, type, defaultProps]);

  return (
    <div className="wrapper" onClick={handleAddComponent}>
      <div className="component">
        <Component />
      </div>
    </div>
  );
};
const ComponentLib: FC = () => {
  return (
    <ComponentLibWrapper>
      {questionComponentGroupList.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>
              {components.map(component => (
                <ComponentItem key={component.type} component={component} />
              ))}
            </div>
          </div>
        );
      })}
    </ComponentLibWrapper>
  );
};

export default ComponentLib;
