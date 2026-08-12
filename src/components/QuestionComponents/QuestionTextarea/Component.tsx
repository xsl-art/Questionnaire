import { type FC, type ChangeEvent } from 'react';
import { type QuestionTextareaProps, defaultQuestionTextareaProps } from './types';
import { Typography, Input } from 'antd';
import { usePreviewContext } from '@/contexts/PreviewContext';

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
  const {
    fe_id,
    title,
    placeholder,
    value: propValue,
  } = {
    ...defaultQuestionTextareaProps,
    ...props,
  };

  const { isPreviewMode, mockAnswers, setMockAnswer } = usePreviewContext();
  const previewValue =
    fe_id !== undefined && mockAnswers[fe_id] !== undefined
      ? (mockAnswers[fe_id] as string)
      : propValue;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isPreviewMode && fe_id) {
      setMockAnswer(fe_id, e.target.value);
    }
  };

  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea
          placeholder={placeholder}
          autoSize={{ minRows: 2 }}
          value={previewValue}
          onChange={handleChange}
          disabled={!isPreviewMode}
        />
      </div>
    </>
  );
};

export default QuestionTextarea;
