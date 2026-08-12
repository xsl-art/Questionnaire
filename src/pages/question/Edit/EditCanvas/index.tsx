import { type FC } from 'react';
import { EditCanvasWrapper } from './style';
import classnames from 'classnames';
import { Spin } from 'antd';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';
import {
  changeSelectedId,
  type ComponentInfoType,
  moveComponent,
} from '@/store/componentsStore/componentsReducer';
import { useDispatch } from 'react-redux';
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress';
import SortableItem from '@/components/DragSortable/SortableItem';
import SortableContainer from '@/components/DragSortable/SortableContainer';

type PropsType = {
  loading: boolean;
};

//根据组件类型获取组件
const getComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig === null) return null;
  const { Component } = componentConfig!;
  return <Component {...props} />;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useComponentInfo();
  const dispatch = useDispatch();

  // 编辑画布始终显示所有组件，避免设置条件后无法继续编辑
  const visibleComponentList = componentList;

  //组件选中状态
  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(changeSelectedId(id));
  };

  //快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );
  }

  //SortableContainer组件的items属性需要id
  const componentListWithId = visibleComponentList.map(item => ({ ...item, id: item.fe_id }));

  //拖拽牌序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  return (
    <EditCanvasWrapper>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {visibleComponentList
          .filter(item => !item.isHidden)
          .map(item => {
            const { fe_id, isLocked } = item;
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={classnames(
                    'component-wrapper',
                    selectedId === fe_id ? 'selected' : '',
                    isLocked ? 'locked' : ''
                  )}
                  key={fe_id}
                  onClick={e => handleSelect(e, fe_id)}
                >
                  <div className="component">{getComponent(item)}</div>
                </div>
              </SortableItem>
            );
          })}
      </SortableContainer>
    </EditCanvasWrapper>
  );
};

export default EditCanvas;
