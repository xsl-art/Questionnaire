import { type FC } from 'react';
import classNames from 'classnames';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';
import { ListWrapper } from './style';

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const ComponentList: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentList } = useComponentInfo();

  return (
    <ListWrapper>
      {componentList
        .filter(c => !c.isHidden) // 过滤隐藏的组件
        .map(c => {
          const { fe_id, props, type } = c;

          const componentConf = getComponentConfigByType(type);
          if (componentConf == null) return null;

          const { Component } = componentConf;

          return (
            <div
              className={classNames(
                'component-wrapper',
                fe_id === selectedComponentId ? 'selected' : ''
              )}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className="component">
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
    </ListWrapper>
  );
};

export default ComponentList;
