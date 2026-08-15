import { type FC } from 'react';
import { type OptionType, type QuestionCheckboxProps } from '../types';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import {
  DownCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';
const PropComponent: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
  const { title, isVertical, list, onChange, disabled } = props;
  const [form] = Form.useForm();

  const handleValueChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove, move }) => (
            <>
              {fields.map((item, index) => {
                //name是list的索引
                const { key, name } = item;
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((option: OptionType) => {
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
                    const newValue = nanoid(5);
                    add({ text: '默认选项', value: newValue });
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
      <Form.Item label="是否竖向排列" name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
