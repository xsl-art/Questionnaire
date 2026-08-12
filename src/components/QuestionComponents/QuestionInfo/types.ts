export type QuestionInfoProps = {
  fe_id?: string;
  title?: string;
  desc?: string;

  onChange?: (newProps: QuestionInfoProps) => void;
  disabled?: boolean;
};

export const defaultQuestionInfoProps: QuestionInfoProps = {
  title: '标题',
  desc: '这是一段描述',
};
