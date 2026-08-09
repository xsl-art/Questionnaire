import { useState, type FC } from 'react';
import { Upload, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { type QuestionImageUploadProps, defaultQuestionImageUploadProps } from './types';
import { uploadImageService } from '@/api/upload';

const { Paragraph } = Typography;

const uploadButton = (
  <button style={{ border: 0, background: 'none' }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>上传</div>
  </button>
);

const QuestionImageUpload: FC<QuestionImageUploadProps> = (props: QuestionImageUploadProps) => {
  const { title, maxCount } = { ...defaultQuestionImageUploadProps, ...props };
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    const normalized = newFileList.map(file => {
      if (file.status === 'done' && file.response && !file.url) {
        return { ...file, url: String(file.response) };
      }
      return file;
    });
    setFileList(normalized);
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Upload
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
      >
        {fileList.length >= (maxCount || 5) ? null : uploadButton}
      </Upload>
    </div>
  );
};

export default QuestionImageUpload;
