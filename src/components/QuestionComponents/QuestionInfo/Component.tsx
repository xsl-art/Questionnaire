import { type FC } from 'react';
import { type QuestionInfoProps, defaultQuestionInfoProps } from './types';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;
const QuestionInfo: FC<QuestionInfoProps> = props => {
  const { title, desc = '' } = { ...defaultQuestionInfoProps, ...props };
  const descList = desc.split('\n');

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ fontSize: 24 }}>{title}</Title>
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
