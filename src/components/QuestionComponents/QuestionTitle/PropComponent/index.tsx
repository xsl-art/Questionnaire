import { useEffect, type FC } from 'react';
import { PropComponentWrapper } from './style';
import type { QuestionTitleProps } from '../types';
import { Checkbox, Form, Input, Select } from 'antd';
const PropComponent: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const [form] = Form.useForm();
  const { text, level, isCenter, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

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
        initialValues={{ text, level, isCenter }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item label="标题" name="text" rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="层级" name="level">
          <Select
            options={[
              { value: 1, text: '标题等级1' },
              { value: 2, text: '标题等级2' },
              { value: 3, text: '标题等级3' },
              { value: 4, text: '标题等级4' },
              { value: 5, text: '标题等级5' },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
          <Checkbox>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </PropComponentWrapper>
  );
};

export default PropComponent;
