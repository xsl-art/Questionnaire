import type { QuestionTitleProps } from './QuestionTitle/types';
import type { QuestionInputProps } from './QuestionInput/types';
import type { QuestionParagraphProps } from './QuestionParagraph/types';
import type { QuestionInfoProps } from './QuestionInfo/types';
import type { QuestionTextareaProps } from './QuestionTextarea/types';
import type { QuestionRadioProps, QuestionRadioStatisticsProps } from './QuestionRadio/types';
import type {
  QuestionCheckboxProps,
  QuestionCheckboxStatisticsProps,
} from './QuestionCheckbox/types';
import type { QuestionImageProps } from './QuestionImage/types';
import type { QuestionVideoProps } from './QuestionVideo/types';
import type { QuestionImageUploadProps } from './QuestionImageUpload/types';
import questionInputConfig from './QuestionInput';
import questionTitleConfig from './QuestionTitle';
import QuestionParagraphConfig from './QuestionParagraph';
import QuestionInfoConfig from './QuestionInfo';
import QuestionTextareaConfig from './QuestionTextarea';
import QuestionRadioConfig from './QuestionRadio';
import QuestionCheckboxConfig from './QuestionCheckbox';
import QuestionImageConfig from './QuestionImage';
import QuestionVideoConfig from './QuestionVideo';
import QuestionImageUploadConfig from './QuestionImageUpload';
import type { FC } from 'react';

//统一各个组件的prop type
export type ComponentPropsType = QuestionTitleProps &
  QuestionInputProps &
  QuestionParagraphProps &
  QuestionInfoProps &
  QuestionTextareaProps &
  QuestionRadioProps &
  QuestionCheckboxProps &
  QuestionImageProps &
  QuestionVideoProps &
  QuestionImageUploadProps;

//统一组件的prop type
type ComponentStatisticsPropsType = QuestionRadioStatisticsProps & QuestionCheckboxStatisticsProps;

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
  'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in' | 'not_in' | 'not_contains';

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
  questionTitleConfig,
  questionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
  QuestionImageConfig,
  QuestionVideoConfig,
  QuestionImageUploadConfig,
];

//组件分组
export const questionComponentGroupList = [
  {
    groupId: 'display',
    groupName: '文本显示',
    components: [questionTitleConfig, QuestionParagraphConfig, QuestionInfoConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [questionInputConfig, QuestionTextareaConfig],
  },
  {
    groupId: 'select',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
  {
    groupId: 'media',
    groupName: '富媒体',
    components: [QuestionImageConfig, QuestionVideoConfig, QuestionImageUploadConfig],
  },
];

export const getComponentConfigByType = (type: string) => {
  return questionComponentConfigList.find(item => item.type === type);
};
