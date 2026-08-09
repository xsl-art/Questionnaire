import { useEffect, type FC } from 'react';
import { Form, Input, Checkbox, Space, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { QuestionVideoProps } from '../types';
import { uploadImageService } from '@/api/upload';
import { PropComponentWrapper } from './style';

const PropComponent: FC<QuestionVideoProps> = (props: QuestionVideoProps) => {
  const [form] = Form.useForm();
  const { src, width, height, autoPlay, controls, loop, muted, poster, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ src, width, height, autoPlay, controls, loop, muted, poster });
  }, [src, width, height, autoPlay, controls, loop, muted, poster]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  const handlePosterUpload = async (file: File) => {
    try {
      const { url } = await uploadImageService(file);
      form.setFieldsValue({ poster: url });
      handleValueChange();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PropComponentWrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ src, width, height, autoPlay, controls, loop, muted, poster }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item
          label="视频地址"
          name="src"
          rules={[{ required: true, message: '请输入视频地址' }]}
        >
          <Input placeholder="请输入视频 URL" />
        </Form.Item>
        <Form.Item label="宽度" name="width">
          <Input placeholder="例如 100% 或 400" />
        </Form.Item>
        <Form.Item label="高度" name="height">
          <Input placeholder="例如 auto 或 300" />
        </Form.Item>
        <Form.Item label="封面图" name="poster">
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="请输入封面图 URL" />
            <Upload
              showUploadList={false}
              beforeUpload={file => {
                handlePosterUpload(file);
                return false;
              }}
              disabled={disabled}
            >
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Space.Compact>
        </Form.Item>
        <Space wrap>
          <Form.Item name="autoPlay" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Checkbox>自动播放</Checkbox>
          </Form.Item>
          <Form.Item name="controls" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Checkbox>显示控制条</Checkbox>
          </Form.Item>
          <Form.Item name="loop" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Checkbox>循环播放</Checkbox>
          </Form.Item>
          <Form.Item name="muted" valuePropName="checked" style={{ marginBottom: 0 }}>
            <Checkbox>静音</Checkbox>
          </Form.Item>
        </Space>
      </Form>
    </PropComponentWrapper>
  );
};

export default PropComponent;
