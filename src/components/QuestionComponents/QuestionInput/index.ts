/**
 * @description: 问卷输入框
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionInputProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const questionInputConfig: QuestionComponentConfig = {
  title: '输入框',
  type: 'questionInput',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionInputProps,
};

export default questionInputConfig;
