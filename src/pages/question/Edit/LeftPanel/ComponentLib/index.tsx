import { type FC } from 'react';
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

const getComponent = (component: QuestionComponentConfig<any>, dispatch: any) => {
  const { title, type, Component, defaultProps } = component;

  const handleAddComponent = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  };

  return (
    <div key={type} className="wrapper" onClick={() => handleAddComponent()}>
      <div className="component">
        <Component />
      </div>
    </div>
  );
};
const ComponentLib: FC = () => {
  const dispatch = useDispatch();
  return (
    <ComponentLibWrapper>
      {questionComponentGroupList.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(component => getComponent(component, dispatch))}</div>
          </div>
        );
      })}
    </ComponentLibWrapper>
  );
};

export default ComponentLib;
