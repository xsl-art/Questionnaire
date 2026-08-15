import { useEffect, type FC } from 'react';
import type { QuestionParagraphProps } from '../types';
import { Input, Form, Checkbox } from 'antd';

const { TextArea } = Input;
const PropComponent: FC = (props: QuestionParagraphProps) => {
  const [form] = Form.useForm();
  const { text, isCenter, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ text, isCenter }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item
          label="段落内容"
          name="text"
          rules={[{ required: true, message: '请输入段落内容' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
          <Checkbox>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
