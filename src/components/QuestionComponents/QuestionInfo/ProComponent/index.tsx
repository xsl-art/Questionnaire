import { useEffect, type FC } from 'react';
import { type QuestionInfoProps } from '../types';
import { Form, Input } from 'antd';

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
  const { title, desc = '', onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={() => handleValueChange()}
      disabled={disabled}
    >
      <Form.Item label="文本标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请输入描述' }]}>
        <TextArea placeholder="请输入描述" />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
