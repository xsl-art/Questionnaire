import { type FC } from 'react';
import { type QuestionRadioProps, defaultQuestionRadioProps } from './types';
import { Typography, Radio, Space, type RadioChangeEvent } from 'antd';
import { usePreviewContext } from '@/contexts/PreviewContext';

const { Paragraph } = Typography;

const QuestionRadio: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
  const {
    fe_id,
    title,
    isVertical,
    options,
    value: propValue,
  } = {
    ...defaultQuestionRadioProps,
    ...props,
  };

  const { isPreviewMode, mockAnswers, setMockAnswer } = usePreviewContext();
  const previewValue =
    fe_id !== undefined && mockAnswers[fe_id] !== undefined
      ? (mockAnswers[fe_id] as string)
      : propValue;

  const handleChange = (e: RadioChangeEvent) => {
    if (isPreviewMode && fe_id) {
      setMockAnswer(fe_id, e.target?.value);
    }
  };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={previewValue} onChange={handleChange} disabled={!isPreviewMode}>
        <Space orientation={isVertical ? 'vertical' : 'horizontal'}>
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
