export type QuestionInputProps = {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionInputProps) => void;
  disabled?: boolean;
};

export const defaultQuestionInputProps: QuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入内容...',
};
