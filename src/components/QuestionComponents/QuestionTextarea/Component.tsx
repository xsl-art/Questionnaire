import { type FC } from 'react';
import { type QuestionTextareaProps, defaultQuestionTextareaProps } from './types';
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;
const QuestionTextarea: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
  const { title, placeholder } = { ...defaultQuestionTextareaProps, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} autoSize={{ minRows: 2 }} />
      </div>
    </>
  );
};

export default QuestionTextarea;
