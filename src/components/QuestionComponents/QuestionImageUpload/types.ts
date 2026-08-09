import type { UploadFile } from 'antd';

export type QuestionImageUploadProps = {
  title?: string;
  maxCount?: number;
  disabled?: boolean;
  onChange?: (newProps: QuestionImageUploadProps) => void;
};

export const defaultQuestionImageUploadProps: QuestionImageUploadProps = {
  title: '图片上传',
  maxCount: 5,
};

// 内部维护的上传状态（画布预览用）
export type QuestionImageUploadState = {
  fileList: UploadFile[];
};
