import type { FC } from 'react';
import { type QuestionTitleProps, defaultQuestionTitleProps } from './types';
import { Typography } from 'antd';

const { Title } = Typography;
const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { text = '', level = 1, isCenter = false } = { ...defaultQuestionTitleProps, ...props };

  const getFontSize = (level: number) => {
    if (level === 1) return '24px';
    if (level === 2) return '20px';
    if (level === 3) return '16px';
    if (level === 4) return '14px';
    if (level === 5) return '12px';
    return '16px';
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
