/**
 * @description: 图片上传
 */

import Component from './Component';
import PropComponent from './PropComponent';
import { defaultQuestionImageUploadProps } from './types';
import type { QuestionComponentConfig } from '../type';

export * from './types';

const questionImageUploadConfig: QuestionComponentConfig = {
  title: '图片上传',
  type: 'questionImageUpload',
  Component,
  PropComponent,
  defaultProps: defaultQuestionImageUploadProps,
};

export default questionImageUploadConfig;
