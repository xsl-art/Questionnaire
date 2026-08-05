import type { QuestionTitleProps } from './QuestionTitle/types';
import type { QuestionInputProps } from './QuestionInput/types';
import type { QuestionParagraphProps } from './QuestionParagraph/types';
import type { QuestionInfoProps } from './QuestionInfo/types';
import type { QuestionTextareaProps } from './QuestionTextarea/types';
import type { QuestionRadioProps } from './QuestionRadio/types';
import type { QuestionCheckboxProps } from './QuestionCheckbox/types';
import questionInputConfig from './QuestionInput';
import questionTitleConfig from './QuestionTitle';
import QuestionParagraphConfig from './QuestionParagraph';
import QuestionInfoConfig from './QuestionInfo';
import QuestionTextareaConfig from './QuestionTextarea';
import QuestionRadioConfig from './QuestionRadio';
import QuestionCheckboxConfig from './QuestionCheckbox';
import type { FC } from 'react';

//统一各个组件的prop type
export type ComponentPropsType = QuestionTitleProps &
  QuestionInputProps &
  QuestionParagraphProps &
  QuestionInfoProps &
  QuestionTextareaProps &
  QuestionRadioProps &
  QuestionCheckboxProps;

//统一组件配置
export interface QuestionComponentConfig<T = any> {
  title: string;
  type: string;
  Component: FC<T>;
  PropComponent: FC<T>; //属性组件
  defaultProps: T;
}

//全部组件配置的列表
const questionComponentConfigList: QuestionComponentConfig[] = [
  questionTitleConfig,
  questionInputConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig,
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
];

export const getComponentConfigByType = (type: string) => {
  return questionComponentConfigList.find(item => item.type === type);
};
