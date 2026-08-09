import { useEffect, type FC } from 'react';
import { Form, InputNumber, Input } from 'antd';
import type { QuestionImageUploadProps } from '../types';
import { PropComponentWrapper } from './style';

const PropComponent: FC<QuestionImageUploadProps> = (props: QuestionImageUploadProps) => {
  const [form] = Form.useForm();
  const { title, maxCount, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ title, maxCount });
  }, [title, maxCount]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <PropComponentWrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title, maxCount }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="最大上传数量" name="maxCount">
          <InputNumber min={1} max={20} style={{ width: '100%' }} placeholder="最多允许上传几张" />
        </Form.Item>
      </Form>
    </PropComponentWrapper>
  );
};

export default PropComponent;
