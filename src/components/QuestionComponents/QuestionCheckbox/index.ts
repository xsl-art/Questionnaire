/**
 * @description 问卷 checkbox
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionCheckboxProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const QuestionCheckboxConfig: QuestionComponentConfig = {
  title: '多选',
  type: 'questionCheckbox',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionCheckboxProps,
};

export default QuestionCheckboxConfig;
