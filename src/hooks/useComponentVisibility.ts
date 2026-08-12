import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { StateType } from '@/store';
import type { ComponentInfoType } from '@/store/componentsStore/componentsReducer';
import { evaluateConditionGroup } from '@/utils/conditionEngine';

/**
 * 获取所有组件的当前值（用于条件计算）
 * 实际场景中应该从表单状态或答题数据中获取
 * 编辑模式下使用组件的 defaultProps 或当前 props 模拟
 */
const useComponentValues = (): Record<string, Record<string, any>> => {
  const componentList = useSelector(
    (state: StateType) => state.components.present.componentList
  ) as ComponentInfoType[];

  return useMemo(() => {
    const values: Record<string, Record<string, any>> = {};

    componentList.forEach(comp => {
      // 从组件 props 中提取值
      // 编辑模式下，单选/多选组件的 value 可能在 props 中
      values[comp.fe_id] = {
        value: comp.props.value,
        // 可以扩展其他字段
      };
    });

    return values;
  }, [componentList]);
};

/**
 * 计算组件的可见性
 * @param componentList 组件列表
 * @returns 带可见性标记的组件列表
 */
export const useComponentVisibility = (componentList: ComponentInfoType[]) => {
  const componentValues = useComponentValues();

  const visibleComponentList = useMemo(() => {
    return componentList.map(comp => {
      // 没有条件或手动隐藏的组件
      if (!comp.visibleCondition || comp.isHidden) {
        return { ...comp, isConditionVisible: true };
      }

      // 计算条件
      const isConditionVisible = evaluateConditionGroup(comp.visibleCondition, componentValues);

      return { ...comp, isConditionVisible };
    });
  }, [componentList, componentValues]);

  return visibleComponentList;
};
