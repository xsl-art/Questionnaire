import { type FC, type ChangeEvent } from 'react';
import { type QuestionInputProps, defaultQuestionInputProps } from './types';
import { Typography, Input } from 'antd';
import { usePreviewContext } from '@/contexts/PreviewContext';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
  const {
    fe_id,
    title,
    placeholder,
    value: propValue,
  } = {
    ...defaultQuestionInputProps,
    ...props,
  };

  const { isPreviewMode, mockAnswers, setMockAnswer } = usePreviewContext();
  const previewValue =
    fe_id !== undefined && mockAnswers[fe_id] !== undefined
      ? (mockAnswers[fe_id] as string)
      : propValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isPreviewMode && fe_id) {
      setMockAnswer(fe_id, e.target.value);
    }
  };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input
          placeholder={placeholder}
          value={previewValue}
          onChange={handleChange}
          disabled={!isPreviewMode}
        />
      </div>
    </>
  );
};

export default QuestionInput;
