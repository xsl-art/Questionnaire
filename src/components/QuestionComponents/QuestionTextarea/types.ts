export type QuestionTextareaProps = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaProps) => void;
  disabled?: boolean;
};

export const defaultQuestionTextareaProps: QuestionTextareaProps = {
  title: '文本域标题',
  placeholder: '请输入内容...',
};
