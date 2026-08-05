/**
 * @description: 问卷段落
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionParagraphProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

//配置
const QuestionParagraphConfig: QuestionComponentConfig = {
  title: '标题',
  type: 'questionParagraph',
  Component, //画布展示的组件
  PropComponent, //属性组件
  defaultProps: defaultQuestionParagraphProps,
};

export default QuestionParagraphConfig;
