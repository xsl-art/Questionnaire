import { type FC } from 'react';
import { EditCanvasWrapper } from './style';
import classnames from 'classnames';
import { Spin, Typography } from 'antd';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { getComponentConfigByType } from '@/components/QuestionComponents/type';
import {
  changeSelectedId,
  type ComponentInfoType,
  moveComponent,
} from '@/store/componentsStore/componentsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress';
import SortableItem from '@/components/DragSortable/SortableItem';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import { evaluateConditionGroup, extractComponentValue } from '@/utils/conditionEngine';
import type { StateType } from '@/store';
import { setMockAnswer } from '@/store/previewStore/previewReducer';
import { PreviewContext } from '@/contexts/PreviewContext';

const { Text } = Typography;

type PropsType = {
  loading: boolean;
};

//根据组件类型获取组件
const getComponent = (componentInfo: ComponentInfoType) => {
  const { type, props, fe_id } = componentInfo;
  const componentConfig = getComponentConfigByType(type);
  if (componentConfig === null) return null;
  const { Component } = componentConfig!;
  return <Component {...props} fe_id={fe_id} />;
};

/**
 * 计算预览模式下各组件是否满足显示条件
 */
const computePreviewVisibility = (
  componentList: ComponentInfoType[],
  mockAnswers: Record<string, unknown>
): Record<string, boolean> => {
  const componentValues: Record<string, Record<string, unknown>> = {};
  componentList.forEach(comp => {
    const extracted = extractComponentValue(comp);
    // 模拟答案覆盖从 props 提取的默认值
    componentValues[comp.fe_id] = {
      ...extracted,
      value: mockAnswers[comp.fe_id] !== undefined ? mockAnswers[comp.fe_id] : extracted.value,
    };
  });

  const visibility: Record<string, boolean> = {};
  componentList.forEach(comp => {
    if (comp.isHidden) {
      visibility[comp.fe_id] = false;
    } else if (!comp.visibleCondition) {
      visibility[comp.fe_id] = true;
    } else {
      visibility[comp.fe_id] = evaluateConditionGroup(comp.visibleCondition, componentValues);
    }
  });

  return visibility;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useComponentInfo();
  const dispatch = useDispatch();
  const { isPreviewMode, mockAnswers } = useSelector((state: StateType) => state.preview);

  // 预览模式下按条件计算显隐；编辑模式始终显示所有组件
  const visibility = isPreviewMode ? computePreviewVisibility(componentList, mockAnswers) : null;

  const visibleComponentList = isPreviewMode
    ? componentList.filter(item => !item.isHidden && visibility?.[item.fe_id])
    : componentList;

  // 预览模式下被隐藏但仍可查看的组件（半透明占位）
  const hiddenComponentList = isPreviewMode
    ? componentList.filter(item => item.isHidden || !visibility?.[item.fe_id])
    : [];

  //组件选中状态
  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(changeSelectedId(id));
  };

  const handleMockAnswerChange = (fe_id: string, value: unknown) => {
    dispatch(setMockAnswer({ fe_id, value }));
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
    <PreviewContext.Provider
      value={{
        isPreviewMode,
        mockAnswers,
        setMockAnswer: handleMockAnswerChange,
      }}
    >
      <EditCanvasWrapper className={isPreviewMode ? 'preview-mode' : ''}>
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
          {hiddenComponentList.map(item => {
            const { fe_id } = item;
            return (
              <div
                key={fe_id}
                className={classnames(
                  'component-wrapper',
                  'preview-hidden',
                  selectedId === fe_id ? 'selected' : ''
                )}
                onClick={e => handleSelect(e, fe_id)}
              >
                <div className="component">
                  <Text type="secondary">预览中已隐藏：{item.title}</Text>
                </div>
              </div>
            );
          })}
        </SortableContainer>
      </EditCanvasWrapper>
    </PreviewContext.Provider>
  );
};

export default EditCanvas;
