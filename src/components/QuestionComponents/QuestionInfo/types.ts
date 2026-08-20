export type QuestionInfoProps = {
  fe_id?: string;
  title?: string;
  desc?: string;
  level?: number;
  isCenter?: boolean;

  onChange?: (newProps: QuestionInfoProps) => void;
  disabled?: boolean;
};

export const defaultQuestionInfoProps: QuestionInfoProps = {
  title: '标题',
  desc: '这是一段描述',
  level: 1,
  isCenter: false,
};
