import { type FC } from 'react';
import { type QuestionInputProps, defaultQuestionInputProps } from './types';
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const { title, placeholder } = { ...defaultQuestionInputProps, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </>
  );
};

export default QuestionInput;
