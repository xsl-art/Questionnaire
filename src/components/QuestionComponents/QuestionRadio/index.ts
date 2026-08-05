/**
 * @description 问卷radio
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionRadioProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const QuestionRadioConfig: QuestionComponentConfig = {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: defaultQuestionRadioProps,
};

export default QuestionRadioConfig;
