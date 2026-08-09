/**
 * @description: 视频展示
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionVideoProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const questionVideoConfig: QuestionComponentConfig = {
  title: '视频',
  type: 'questionVideo',
  Component,
  PropComponent,
  defaultProps: defaultQuestionVideoProps,
};

export default questionVideoConfig;
