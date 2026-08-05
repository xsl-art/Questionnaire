/**
 * @description: 问卷标题
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionTitleProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

//组件配置
const questionTitleConfig: QuestionComponentConfig = {
  title: '标题',
  type: 'questionTitle',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionTitleProps,
};

export default questionTitleConfig;
