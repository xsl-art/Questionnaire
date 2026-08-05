/**
 * @description: 问卷文本域
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionTextareaProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const QuestionTextareaConfig: QuestionComponentConfig = {
  title: '文本域',
  type: 'questionTextarea',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionTextareaProps,
};

export default QuestionTextareaConfig;
