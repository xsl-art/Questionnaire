import type { ComponentInfoType } from '@/store/componentsStore/componentsReducer';
import type { ConditionGroup } from '@/components/QuestionComponents/type';

export type CircularCheckResult = {
  hasCycle: boolean;
  cycle?: string[];
};

/**
 * 检测条件显示是否存在循环引用
 * @param componentList 组件列表
 * @returns 是否存在环，若存在返回环上的组件 fe_id 列表
 */
export const checkCircularCondition = (componentList: ComponentInfoType[]): CircularCheckResult => {
  const adjacency: Record<string, string[]> = {};
  const componentIds = new Set(componentList.map(item => item.fe_id));

  // 构建有向图：被控制组件 -> 触发源组件
  componentList.forEach(comp => {
    adjacency[comp.fe_id] = [];
    const condition = comp.visibleCondition;
    if (condition?.rules?.length) {
      condition.rules.forEach(rule => {
        if (rule.sourceId && componentIds.has(rule.sourceId)) {
          adjacency[comp.fe_id].push(rule.sourceId);
        }
      });
    }
  });

  const colors: Record<string, 'white' | 'gray' | 'black'> = {};
  componentList.forEach(comp => {
    colors[comp.fe_id] = 'white';
  });

  const path: string[] = [];

  const dfs = (node: string): string[] | null => {
    colors[node] = 'gray';
    path.push(node);

    for (const neighbor of adjacency[node] || []) {
      if (colors[neighbor] === 'gray') {
        // 找到环，截取环部分
        const cycleStart = path.indexOf(neighbor);
        return [...path.slice(cycleStart), neighbor];
      }
      if (colors[neighbor] === 'white') {
        const cycle = dfs(neighbor);
        if (cycle) return cycle;
      }
    }

    path.pop();
    colors[node] = 'black';
    return null;
  };

  for (const comp of componentList) {
    if (colors[comp.fe_id] === 'white') {
      const cycle = dfs(comp.fe_id);
      if (cycle) {
        return { hasCycle: true, cycle };
      }
    }
  }

  return { hasCycle: false };
};

/**
 * 检测单个条件组是否会与现有组件列表形成循环引用
 * @param componentList 现有组件列表
 * @param targetFeId 被设置条件的组件 id
 * @param condition 新的条件组
 */
export const checkCircularConditionForGroup = (
  componentList: ComponentInfoType[],
  targetFeId: string,
  condition: ConditionGroup | null
): CircularCheckResult => {
  // 构造临时组件列表，将目标组件的条件替换为新条件
  const tempList = componentList.map(comp =>
    comp.fe_id === targetFeId ? { ...comp, visibleCondition: condition } : comp
  );
  return checkCircularCondition(tempList);
};
