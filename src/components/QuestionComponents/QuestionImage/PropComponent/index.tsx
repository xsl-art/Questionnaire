import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import {
  Form,
  Input,
  Upload,
  Button,
  Space,
  Select,
  Card,
  Row,
  Col,
  Typography,
  message,
  Checkbox,
} from 'antd';
import { UploadOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import type { QuestionImageProps, ImageItem } from '../types';
import { uploadImageService } from '@/api/upload';
import { nanoid } from 'nanoid';

const { Text } = Typography;

const OBJECT_FIT_OPTIONS = [
  { value: 'contain', label: 'contain（完整显示）' },
  { value: 'cover', label: 'cover（铺满裁剪）' },
  { value: 'fill', label: 'fill（拉伸填充）' },
  { value: 'none', label: 'none（原始尺寸）' },
  { value: 'scale-down', label: 'scale-down（自适应缩小）' },
];

const PropComponent: FC<QuestionImageProps> = (props: QuestionImageProps) => {
  const [form] = Form.useForm();
  const {
    src,
    alt,
    width,
    height,
    objectFit,
    images = [],
    isHorizontal,
    isCenter,
    onChange,
    disabled,
  } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [linkUrl, setLinkUrl] = useState('');
  const pendingFilesRef = useRef<File[]>([]);
  const uploadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 初始化表单值
  useEffect(() => {
    form.setFieldsValue({ src, alt, width, height, objectFit, isHorizontal, isCenter });
  }, [src, alt, width, height, objectFit, isHorizontal, isCenter, form]);

  // 从 images 计算 fileList
  const fileList = useMemo<UploadFile[]>(() => {
    return images.map((img, index) => ({
      uid: img.id || `-${index}`,
      name: `图片${index + 1}`,
      status: 'done',
      url: img.src,
      response: img.src,
    }));
  }, [images]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  const handleImagesChange = (newImages: ImageItem[]) => {
    if (onChange) {
      onChange({ ...form.getFieldsValue(), images: newImages });
    }
  };

  // 添加图片到列表
  const addImage = (url: string) => {
    const newImage: ImageItem = {
      id: nanoid(),
      src: url,
      alt: '',
      width,
      height,
      objectFit,
    };
    const newImages = [...images, newImage];
    handleImagesChange(newImages);
  };

  const handleUpload = async (fileListToUpload: File[]) => {
    if (fileListToUpload.length === 0) return;

    const results = await Promise.allSettled(
      fileListToUpload.map(async file => {
        try {
          const { url } = await uploadImageService(file);
          return url;
        } catch (error) {
          console.error('上传失败:', file.name, error);
          return null;
        }
      })
    );

    const newUrls = results
      .filter(
        (r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled' && r.value !== null
      )
      .map(r => r.value);

    if (newUrls.length === 0) {
      messageApi.error('所有图片上传失败');
      return;
    }

    // 一次性添加所有新图片
    const newImages: ImageItem[] = newUrls.map(url => ({
      id: nanoid(),
      src: url,
      alt: '',
      width,
      height,
      objectFit,
    }));

    handleImagesChange([...images, ...newImages]);

    if (newUrls.length < fileListToUpload.length) {
      messageApi.warning(
        `成功上传 ${newUrls.length} 张，${fileListToUpload.length - newUrls.length} 张失败`
      );
    } else {
      messageApi.success(`成功上传 ${newUrls.length} 张图片`);
    }
  };

  const handleLinkAdd = () => {
    if (!linkUrl.trim()) {
      messageApi.warning('请输入图片链接');
      return;
    }
    addImage(linkUrl.trim());
    setLinkUrl('');
    messageApi.success('添加成功');
  };

  const handleRemove = (id: string) => {
    const newImages = images.filter(img => img.id !== id);
    handleImagesChange(newImages);
  };

  const handleImageFieldChange = (id: string, field: keyof ImageItem, value: string | number) => {
    const newImages = images.map(img => (img.id === id ? { ...img, [field]: value } : img));
    handleImagesChange(newImages);
  };

  // 批量应用尺寸到所有图片
  const handleBatchSizeChange = (
    field: 'width' | 'height' | 'objectFit',
    value: string | number
  ) => {
    const newImages = images.map(img => ({
      ...img,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
    if (onChange) {
      onChange({ ...form.getFieldsValue(), [field]: value, images: newImages });
    }
  };

  // 处理布局变化
  const handleLayoutChange = (field: 'isHorizontal' | 'isCenter', value: boolean) => {
    form.setFieldsValue({ [field]: value });
    if (onChange) {
      onChange({ ...form.getFieldsValue(), [field]: value });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ src, alt, width, height, objectFit, isHorizontal, isCenter }}
        onValuesChange={() => handleValueChange()}
        disabled={disabled}
      >
        {/* 批量上传 */}
        <Form.Item label="批量上传图片">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple
            customRequest={({ file, onSuccess }) => {
              // 使用 setTimeout 来收集同一批次的所有文件
              const currentFile = file as File;

              // 将文件加入待上传队列
              pendingFilesRef.current.push(currentFile);

              if (uploadTimerRef.current) {
                clearTimeout(uploadTimerRef.current);
              }

              uploadTimerRef.current = setTimeout(() => {
                const filesToUpload = [...pendingFilesRef.current];
                pendingFilesRef.current = [];
                handleUpload(filesToUpload);
              }, 100);

              setTimeout(() => onSuccess?.('ok'), 0);
            }}
            onRemove={file => {
              const img = images.find((_, index) => fileList[index]?.uid === file.uid);
              if (img) handleRemove(img.id);
              return true;
            }}
            disabled={disabled}
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="图片链接">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="请输入图片 URL"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              onPressEnter={handleLinkAdd}
            />
            <Button
              icon={<LinkOutlined />}
              onClick={handleLinkAdd}
              disabled={disabled || !linkUrl.trim()}
            >
              添加
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="布局设置">
          <Checkbox
            checked={isHorizontal}
            onChange={e => handleLayoutChange('isHorizontal', e.target.checked)}
            disabled={disabled}
          >
            横向排列
          </Checkbox>
          <Checkbox
            checked={isCenter}
            onChange={e => handleLayoutChange('isCenter', e.target.checked)}
            disabled={disabled}
            style={{ marginLeft: 16 }}
          >
            整体居中
          </Checkbox>
        </Form.Item>

        <Card size="small" title="全局尺寸设置（应用到所有图片）" style={{ marginBottom: 16 }}>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item label="宽度" name="width" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="100% 或 200"
                  onChange={e => handleBatchSizeChange('width', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="高度" name="height" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="留空为自适应"
                  onChange={e => handleBatchSizeChange('height', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="填充方式" name="objectFit" style={{ marginBottom: 0 }}>
                <Select
                  placeholder="填充方式"
                  options={OBJECT_FIT_OPTIONS}
                  onChange={value => handleBatchSizeChange('objectFit', value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 单张图片尺寸调整 */}
        {images.length > 0 && (
          <Card size="small" title="单张图片调整" style={{ marginBottom: 16 }}>
            <Space orientation="vertical" style={{ width: '100%' }}>
              {images.map((img, index) => (
                <Card
                  key={img.id}
                  size="small"
                  style={{ marginBottom: 8 }}
                  title={`图片 ${index + 1}`}
                  extra={
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(img.id)}
                      disabled={disabled}
                    />
                  }
                >
                  <Row gutter={8}>
                    <Col span={24}>
                      <img
                        src={img.src}
                        alt={img.alt || `图片${index + 1}`}
                        style={{
                          width: '100%',
                          height: 100,
                          objectFit: 'contain',
                          borderRadius: 4,
                          marginBottom: 8,
                        }}
                      />
                    </Col>
                    <Col span={8}>
                      <Text type="secondary">宽度</Text>
                      <Input
                        value={img.width ?? width ?? ''}
                        placeholder="宽度"
                        onChange={e => handleImageFieldChange(img.id, 'width', e.target.value)}
                        disabled={disabled}
                      />
                    </Col>
                    <Col span={8}>
                      <Text type="secondary">高度</Text>
                      <Input
                        value={img.height ?? height ?? ''}
                        placeholder="留空为自适应"
                        onChange={e => handleImageFieldChange(img.id, 'height', e.target.value)}
                        disabled={disabled}
                      />
                    </Col>
                    <Col span={8}>
                      <Text type="secondary">填充</Text>
                      <Select
                        value={img.objectFit || objectFit || 'contain'}
                        options={OBJECT_FIT_OPTIONS}
                        onChange={value => handleImageFieldChange(img.id, 'objectFit', value)}
                        disabled={disabled}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        <Form.Item label="替代文本" name="alt">
          <Input placeholder="请输入替代文本" />
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
