import { useEffect, type FC } from 'react';
import { type OptionsType, type QuestionRadioProps } from '../types';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import {
  DownCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';

const PropComponent: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value });
  }, [title, isVertical, options, value]);

  const handleValueChange = () => {
    if (onChange) {
      const values = form.getFieldsValue();
      if (values.options && Array.isArray(values.options)) {
        values.options = values.options.map((option: OptionsType) => ({
          ...option,
          value: option.text,
        }));
        form.setFieldsValue(values);
      }
      onChange(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input onChange={handleValueChange} />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove, move }) => (
            <>
              {fields.map((item, index) => {
                const { key, name } = item;
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((option: OptionsType) => {
                              if (option.text === text) num++; //记录text个数
                            });

                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('选项重复'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项" onChange={handleValueChange} />
                    </Form.Item>
                    <Form.Item name={[name, 'value']} hidden>
                      <Input />
                    </Form.Item>

                    {index > 0 && (
                      <UpCircleOutlined
                        onClick={() => {
                          move(index, index - 1);
                          setTimeout(() => {
                            handleValueChange();
                          }, 0);
                        }}
                      />
                    )}

                    {index < fields.length - 1 && (
                      <DownCircleOutlined
                        onClick={() => {
                          move(index, index + 1);
                          setTimeout(() => {
                            handleValueChange();
                          }, 0);
                        }}
                      />
                    )}

                    {fields?.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                          setTimeout(() => {
                            handleValueChange();
                          }, 0);
                        }}
                      />
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => {
                    add({ text: '', value: '' });
                    setTimeout(() => {
                      handleValueChange();
                    }, 0);
                  }}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          onChange={handleValueChange}
          options={options.map(opt => ({
            value: opt.value,
            label: opt.text || '',
          }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox onChange={handleValueChange}>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
