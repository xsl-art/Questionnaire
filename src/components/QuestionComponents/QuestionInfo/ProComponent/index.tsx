import { useEffect, type FC } from 'react';
import { type QuestionInfoProps } from '../types';
import { Checkbox, Form, Input, Select } from 'antd';

const { TextArea } = Input;
const PropComponent: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
  const { title, desc = '', onChange, disabled, level, isCenter } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc, level, isCenter });
  }, [title, desc, level, isCenter]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc, level, isCenter }}
      onValuesChange={() => handleValueChange()}
      disabled={disabled}
    >
      <Form.Item label="文本标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea placeholder="请输入描述" />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: '标题等级1' },
            { value: 2, text: '标题等级2' },
            { value: 3, text: '标题等级3' },
            { value: 'default', text: '默认等级' },
          ]}
        />
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
