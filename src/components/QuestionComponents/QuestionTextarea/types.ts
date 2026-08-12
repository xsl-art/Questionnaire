export type QuestionTextareaProps = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaProps) => void;
  disabled?: boolean;
  value?: string;
};

export const defaultQuestionTextareaProps: QuestionTextareaProps = {
  title: '文本域标题',
  placeholder: '请输入内容...',
  value: '',
};
