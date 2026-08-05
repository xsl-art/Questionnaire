import { type FC } from 'react';
import { type QuestionCheckboxProps, defaultQuestionCheckboxProps } from './types';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;
const QuestionCheckbox: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
  const { title, isVertical, list } = {
    ...defaultQuestionCheckboxProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map(item => {
          const { value, text, checked } = item;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default QuestionCheckbox;
