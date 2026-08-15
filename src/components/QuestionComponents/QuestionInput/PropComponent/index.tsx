import { useEffect, type FC } from 'react';
import type { QuestionInputProps } from '../types';
import { Form, Input } from 'antd';
const PropComponent: FC<QuestionInputProps> = (props: QuestionInputProps) => {
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
          <Input placeholder="请输入提示文本" />
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
