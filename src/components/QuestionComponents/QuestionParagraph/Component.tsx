import { type FC } from 'react';
import { defaultQuestionParagraphProps, type QuestionParagraphProps } from './types';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const QuestionParagraph: FC = (props: QuestionParagraphProps) => {
  const { text = '', isCenter = false } = { ...defaultQuestionParagraphProps, ...props };
  const textList = text.split('\n');

  return (
    <Paragraph
      style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0', textIndent: '2em' }}
    >
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  );
};

export default QuestionParagraph;
