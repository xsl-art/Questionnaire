import type { ConditionRule, ConditionGroup } from '@/components/QuestionComponents/type';

/**
 * 判断值是否为空（未填写/未选择）
 */
const isEmptyValue = (value: unknown): boolean => {
  return value === undefined || value === null || value === '';
};

/**
 * 计算两个数组的交集
 */
const intersection = (a: string[], b: string[]): string[] => {
  const setB = new Set(b);
  return a.filter(item => setB.has(item));
};

/**
 * 单条规则计算
 * @param rule 条件规则
 * @param componentValues 所有组件的当前值 { [fe_id]: { [field]: value } }
 * @returns 是否满足条件
 */
export const evaluateCondition = (
  rule: ConditionRule,
  componentValues: Record<string, Record<string, any>>
): boolean => {
  const { sourceId, sourceField, operator, targetValue } = rule;

  // 获取触发组件的实际值
  const actualValue = componentValues[sourceId]?.[sourceField];

  // 完全未填写时：ne 算满足，其他算不满足
  if (isEmptyValue(actualValue)) {
    return operator === 'ne';
  }

  switch (operator) {
    case 'eq':
      return actualValue === targetValue;
    case 'ne':
      return actualValue !== targetValue;
    case 'gt':
      return Number(actualValue) > Number(targetValue);
    case 'lt':
      return Number(actualValue) < Number(targetValue);
    case 'gte':
      return Number(actualValue) >= Number(targetValue);
    case 'lte':
      return Number(actualValue) <= Number(targetValue);
    case 'contains': {
      // 字符串包含子串
      if (typeof actualValue === 'string') {
        return actualValue.includes(String(targetValue));
      }
      // 数组包含目标选项中的任意一个（交集非空）
      if (Array.isArray(actualValue)) {
        const targetArray = Array.isArray(targetValue) ? targetValue : [String(targetValue)];
        return intersection(actualValue.map(String), targetArray.map(String)).length > 0;
      }
      return false;
    }
    case 'not_contains': {
      // 字符串不包含子串
      if (typeof actualValue === 'string') {
        return !actualValue.includes(String(targetValue));
      }
      // 数组不包含目标选项中的任何一个（交集为空）
      if (Array.isArray(actualValue)) {
        const targetArray = Array.isArray(targetValue) ? targetValue : [String(targetValue)];
        return intersection(actualValue.map(String), targetArray.map(String)).length === 0;
      }
      return true;
    }
    case 'in': {
      // 实际值（数组）是目标选项集合的子集
      if (Array.isArray(actualValue) && Array.isArray(targetValue)) {
        const targetSet = new Set(targetValue.map(String));
        return actualValue.every(item => targetSet.has(String(item)));
      }
      // 单值在目标数组中
      if (Array.isArray(targetValue)) {
        return targetValue.includes(actualValue as string);
      }
      return false;
    }
    case 'not_in': {
      // 实际值（数组）不是目标选项集合的子集
      if (Array.isArray(actualValue) && Array.isArray(targetValue)) {
        const targetSet = new Set(targetValue.map(String));
        return !actualValue.every(item => targetSet.has(String(item)));
      }
      // 单值不在目标数组中
      if (Array.isArray(targetValue)) {
        return !targetValue.includes(actualValue as string);
      }
      return true;
    }
    default:
      return true;
  }
};

/**
 * 条件组计算
 * @param group 条件组
 * @param componentValues 所有组件的当前值
 * @returns 是否满足条件组
 */
export const evaluateConditionGroup = (
  group: ConditionGroup,
  componentValues: Record<string, Record<string, any>>
): boolean => {
  if (!group.rules || group.rules.length === 0) {
    return true; // 没有规则时默认显示
  }

  const results = group.rules.map(rule => evaluateCondition(rule, componentValues));

  return group.logic === 'AND' ? results.every(Boolean) : results.some(Boolean);
};

/**
 * 获取组件的当前值（用于条件判断）
 * 从组件的 props 中提取可用于条件判断的字段值
 */
export const extractComponentValue = (component: {
  type: string;
  props: Record<string, any>;
}): Record<string, any> => {
  const { type, props } = component;

  switch (type) {
    case 'questionInput':
    case 'questionTextarea':
      return { value: props.value || '' };
    case 'questionRadio':
      return { value: props.value || '' };
    case 'questionCheckbox': {
      // 从 list 中读取 checked 状态，props.value 不保证实时维护
      const checkedValues =
        props.list
          ?.filter((item: { checked?: boolean; value: string }) => item.checked)
          .map((item: { value: string }) => item.value) || [];
      return { value: checkedValues };
    }
    default:
      return {};
  }
};
