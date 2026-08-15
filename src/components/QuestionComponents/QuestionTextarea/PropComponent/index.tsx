import { useEffect, type FC } from 'react';
import type { QuestionTextareaProps } from '../types';
import { Form, Input } from 'antd';
const { TextArea } = Input;
const PropComponent: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
  const [form] = Form.useForm();
  const { title, placeholder, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

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
        initialValues={{ title, placeholder }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
          <TextArea placeholder="请输入提示文本" />
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
