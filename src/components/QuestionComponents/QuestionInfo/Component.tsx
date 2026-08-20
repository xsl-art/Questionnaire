import { type FC } from 'react';
import { type QuestionInfoProps, defaultQuestionInfoProps } from './types';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;
const QuestionInfo: FC<QuestionInfoProps> = props => {
  const {
    title,
    desc = '',
    level = 1,
    isCenter = false,
  } = { ...defaultQuestionInfoProps, ...props };
  const descList = desc.split('\n');

  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return '22px';
      case 2:
        return '20px';
      case 3:
        return '18px';
      default:
        return '16px';
    }
  };

  return (
    <div style={{ textAlign: isCenter ? 'center' : 'start' }}>
      <Title style={{ fontSize: getFontSize(level) }}>{title}</Title>
      <Paragraph>
        {descList.map((item, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {item}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default QuestionInfo;
