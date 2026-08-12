export type QuestionParagraphProps = {
  fe_id?: string;
  text?: string;
  isCenter?: boolean;
  onChange?: (newProps: QuestionParagraphProps) => void;
  disabled?: boolean;
};
export const defaultQuestionParagraphProps: QuestionParagraphProps = {
  text: '一段段落',
  isCenter: false,
};
