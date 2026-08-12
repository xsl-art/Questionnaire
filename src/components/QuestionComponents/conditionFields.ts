/**
 * 导出条件组件可触发字段
 */

import type { ConditionOperator } from './type';

export const componentConditionFields: Record<
  string,
  { field: string; label: string; type: 'string' | 'number' | 'boolean' | 'array' }[]
> = {
  questionInput: [{ field: 'value', label: '输入值', type: 'string' }],
  questionTextarea: [{ field: 'value', label: '文本域值', type: 'string' }],
  questionRadio: [{ field: 'value', label: '单选值', type: 'string' }],
  questionCheckbox: [{ field: 'value', label: '复选值', type: 'array' }],
};

const COMMON_OPERATORS: { value: ConditionOperator; label: string }[] = [
  { value: 'is_empty', label: '未填写' },
  { value: 'is_not_empty', label: '已填写' },
];

/**
 * 根据字段类型返回可用运算符
 */
export const getOperatorsByType = (fieldType: string) => {
  const operatorMap: Record<string, { value: ConditionOperator; label: string }[]> = {
    string: [
      { value: 'eq', label: '等于' },
      { value: 'ne', label: '不等于' },
      { value: 'contains', label: '包含' },
      ...COMMON_OPERATORS,
    ],
    number: [
      { value: 'eq', label: '等于' },
      { value: 'ne', label: '不等于' },
      { value: 'gt', label: '大于' },
      { value: 'lt', label: '小于' },
      { value: 'gte', label: '大于等于' },
      { value: 'lte', label: '小于等于' },
      ...COMMON_OPERATORS,
    ],
    boolean: [
      { value: 'eq', label: '等于' },
      { value: 'ne', label: '不等于' },
      ...COMMON_OPERATORS,
    ],
    array: [
      { value: 'contains', label: '包含' },
      { value: 'in', label: '在列表中' },
      { value: 'not_in', label: '不在列表中' },
      { value: 'not_contains', label: '不包含' },
      ...COMMON_OPERATORS,
    ],
  };
  return operatorMap[fieldType] || operatorMap['string'];
};

/**
 * 判断运算符是否需要目标值输入
 */
export const operatorNeedsTargetValue = (operator: ConditionOperator): boolean => {
  return operator !== 'is_empty' && operator !== 'is_not_empty';
};
