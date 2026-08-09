import { useEffect, type FC } from 'react';
import { Form, Input, Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { QuestionImageProps } from '../types';
import { uploadImageService } from '@/api/upload';
import { PropComponentWrapper } from './style';

const PropComponent: FC<QuestionImageProps> = (props: QuestionImageProps) => {
  const [form] = Form.useForm();
  const { src, alt, width, height, objectFit, onChange, disabled } = props;

  useEffect(() => {
    form.setFieldsValue({ src, alt, width, height, objectFit });
  }, [src, alt, width, height, objectFit]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const { url } = await uploadImageService(file);
      form.setFieldsValue({ src: url });
      handleValueChange();
    } catch (error) {
      // 错误已由 service 统一提示
      console.error(error);
    }
  };

  return (
    <PropComponentWrapper>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ src, alt, width, height, objectFit }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        <Form.Item
          label="图片地址"
          name="src"
          rules={[{ required: true, message: '请输入图片地址' }]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="请输入图片 URL" />
            <Upload
              showUploadList={false}
              beforeUpload={file => {
                handleUpload(file);
                return false;
              }}
              disabled={disabled}
            >
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Space.Compact>
        </Form.Item>
        <Form.Item label="替代文本" name="alt">
          <Input placeholder="请输入替代文本" />
        </Form.Item>
        <Form.Item label="宽度" name="width">
          <Input placeholder="例如 100% 或 200" />
        </Form.Item>
        <Form.Item label="高度" name="height">
          <Input placeholder="例如 auto 或 200" />
        </Form.Item>
        <Form.Item label="填充方式" name="objectFit">
          <Input placeholder="contain / cover / fill / none / scale-down" />
        </Form.Item>
      </Form>
    </PropComponentWrapper>
  );
};

export default PropComponent;
