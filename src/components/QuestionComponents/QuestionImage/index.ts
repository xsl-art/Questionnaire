/**
 * @description: 图片展示
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionImageProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const questionImageConfig: QuestionComponentConfig = {
  title: '图片',
  type: 'questionImage',
  Component,
  PropComponent,
  defaultProps: defaultQuestionImageProps,
};

export default questionImageConfig;
