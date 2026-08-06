/**
 * @description 问卷radio
 */

import Component from './Component';
import PropComponent from './PropComponent';
import StatComponent from './StatComponent';
import { defaultQuestionRadioProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const QuestionRadioConfig: QuestionComponentConfig = {
  title: '单选',
  type: 'questionRadio',
  Component,
  PropComponent,
  StatComponent,
  defaultProps: defaultQuestionRadioProps,
};

export default QuestionRadioConfig;
