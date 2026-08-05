import { type FC } from 'react';
import { type QuestionRadioProps, defaultQuestionRadioProps } from './types';
import { Typography, Radio, Space } from 'antd';

const { Paragraph } = Typography;
const QuestionRadio: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
  const { title, isVertical, options, value } = { ...defaultQuestionRadioProps, ...props };
  console.log('Radio render:', { value, options });
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options?.map(item => {
            const { text, value: itemValue } = item;
            return (
              <Radio key={itemValue} value={itemValue}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </>
  );
};

export default QuestionRadio;
