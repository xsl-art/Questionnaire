import type { QuestionTitleProps } from './QuestionTitle/types';
import type { QuestionInputProps } from './QuestionInput/types';
import type { QuestionParagraphProps } from './QuestionParagraph/types';
import type { QuestionInfoProps } from './QuestionInfo/types';
import type { QuestionTextareaProps } from './QuestionTextarea/types';
import type {
  QuestionCheckboxProps,
  QuestionCheckboxStatisticsProps,
} from './QuestionCheckbox/types';
import type { QuestionRadioProps, QuestionRadioStatisticsProps } from './QuestionRadio/types';
import type { QuestionImageProps } from './QuestionImage/types';
import type { QuestionImageUploadProps } from './QuestionImageUpload/types';
import QuestionInputConfig from './QuestionInput';
import QuestionTitleConfig from './QuestionTitle';
import QuestionParagraphConfig from './QuestionParagraph';
import QuestionInfoConfig from './QuestionInfo';
import QuestionTextareaConfig from './QuestionTextarea';
import QuestionCheckboxConfig from './QuestionCheckbox';
import QuestionRadioConfig from './QuestionRadio';
import QuestionImageConfig from './QuestionImage';
import QuestionImageUploadConfig from './QuestionImageUpload';
import type { FC } from 'react';

//统一各个组件的prop type
export type ComponentPropsType = QuestionTitleProps &
  QuestionInputProps &
  QuestionParagraphProps &
  QuestionInfoProps &
  QuestionTextareaProps &
  QuestionCheckboxProps &
  QuestionRadioProps &
  QuestionImageProps &
  QuestionImageUploadProps;

//统一组件的prop type
type ComponentStatisticsPropsType = QuestionCheckboxStatisticsProps & QuestionRadioStatisticsProps;

//统一组件配置
export interface QuestionComponentConfig<T = any> {
  title: string;
  type: string;
  Component: FC<T>;
  PropComponent: FC<T>; //属性组件
  StatComponent?: FC<ComponentStatisticsPropsType>; //统计组件
  defaultProps: T;
}

//条件组件配置
export type ConditionOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'contains'
  | 'in'
  | 'not_in'
  | 'not_contains'
  | 'is_empty'
  | 'is_not_empty';

export type ConditionRule = {
  id: string;
  sourceId: string;
  sourceField: string;
  operator: ConditionOperator;
  targetValue: string | number | boolean | string[];
};

export type ConditionGroup = {
  id: string;
  logic: 'AND' | 'OR';
  rules: ConditionRule[];
};

//全部组件配置的列表
const questionComponentConfigList: QuestionComponentConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
  QuestionImageConfig,
  QuestionImageUploadConfig,
];

//组件分组
export const questionComponentGroupList = [
  {
    groupId: 'display',
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionParagraphConfig, QuestionInfoConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConfig, QuestionTextareaConfig],
  },
  {
    groupId: 'select',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
  {
    groupId: 'media',
    groupName: '上传图片',
    components: [QuestionImageConfig, QuestionImageUploadConfig],
  },
];

export const getComponentConfigByType = (type: string) => {
  return questionComponentConfigList.find(item => item.type === type);
};
