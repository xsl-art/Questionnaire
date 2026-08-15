import { useState, type FC } from 'react';
import { Upload, Typography, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { type QuestionImageUploadProps, defaultQuestionImageUploadProps } from './types';
import { uploadImageService } from '@/api/upload';

const { Paragraph } = Typography;
const { Dragger } = Upload;

const UploadButton = ({ maxCount }: { maxCount: number }) => {
  return (
    <>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
      <p className="ant-upload-hint">支持单张或批量上传，最多上传 {maxCount} 张图片</p>
    </>
  );
};

const QuestionImageUpload: FC<QuestionImageUploadProps> = (props: QuestionImageUploadProps) => {
  const { title, maxCount = 5 } = { ...defaultQuestionImageUploadProps, ...props };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    const normalized = newFileList.map(file => {
      if (file.status === 'done' && file.response && !file.url) {
        return { ...file, url: String(file.response) };
      }
      return file;
    });
    setFileList(normalized);

    const { status, name } = newFileList[newFileList.length - 1] || {};
    if (status === 'done') {
      messageApi.success(`${name} 上传成功`);
    } else if (status === 'error') {
      messageApi.error(`${name} 上传失败`);
    }
  };

  return (
    <div>
      {contextHolder}
      <Paragraph strong>{title}</Paragraph>
      <Dragger
        listType="picture-card"
        fileList={fileList}
        multiple
        maxCount={maxCount}
        customRequest={async ({ file, onSuccess, onError }) => {
          try {
            const { url } = await uploadImageService(file as File);
            onSuccess?.(url);
          } catch (error) {
            onError?.(error as Error);
          }
        }}
        onChange={handleChange}
        onDrop={e => {
          e.preventDefault();
        }}
      >
        {fileList.length >= (maxCount || 5) ? null : <UploadButton maxCount={maxCount} />}
      </Dragger>
    </div>
  );
};

export default QuestionImageUpload;
