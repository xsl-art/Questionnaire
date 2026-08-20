import type { FC } from 'react';
import { type QuestionTitleProps, defaultQuestionTitleProps } from './types';
import { Typography } from 'antd';

const { Title } = Typography;
const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { text = '', level = 1, isCenter = false } = { ...defaultQuestionTitleProps, ...props };

  const getFontSize = (level: number) => {
    if (level === 1) return '28px';
    if (level === 2) return '24px';
    if (level === 3) return '20px';
    return '20px';
  };
  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        fontSize: getFontSize(level),
      }}
    >
      {text}
    </Title>
  );
};

export default QuestionTitle;
