import { type FC } from 'react';
import { type QuestionCheckboxProps, defaultQuestionCheckboxProps } from './types';
import { Checkbox, Space, Typography } from 'antd';
import { usePreviewContext } from '@/contexts/PreviewContext';

const { Paragraph } = Typography;

const QuestionCheckbox: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
  const {
    fe_id,
    title,
    isVertical,
    list,
    value: propValue,
  } = {
    ...defaultQuestionCheckboxProps,
    ...props,
  };

  const { isPreviewMode, mockAnswers, setMockAnswer } = usePreviewContext();
  const previewValue =
    fe_id !== undefined && mockAnswers[fe_id] !== undefined
      ? (mockAnswers[fe_id] as string[])
      : propValue || list?.filter(item => item.checked).map(item => item.value) || [];

  const handleChange = (checkedValues: string[]) => {
    if (isPreviewMode && fe_id) {
      setMockAnswer(fe_id, checkedValues);
    }
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Checkbox.Group value={previewValue} onChange={handleChange} disabled={!isPreviewMode}>
        <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
          {list?.map(item => {
            const { value, text } = item;
            return (
              <Checkbox key={value} value={value}>
                {text}
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    </div>
  );
};

export default QuestionCheckbox;
