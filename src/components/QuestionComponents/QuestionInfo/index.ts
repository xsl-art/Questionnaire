/**
 * @description: 问卷信息
 */

import Component from './Component';
import PropComponent from './ProComponent';
import { defaultQuestionInfoProps } from './types';
import type { QuestionComponentConfig } from '../type';
export * from './types';

const QuestionInfoConfig: QuestionComponentConfig = {
  title: '问卷信息',
  type: 'questionInfo',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionInfoProps,
};

export default QuestionInfoConfig;
