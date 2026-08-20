export type ImageItem = {
  id: string;
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export type QuestionImageProps = {
  fe_id?: string;
  src?: string; // 兼容旧数据，单张图片链接
  alt?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  images?: ImageItem[]; // 多张图片
  isHorizontal?: boolean; // 横向排列
  isCenter?: boolean; // 整体居中
  onChange?: (newProps: QuestionImageProps) => void;
  disabled?: boolean;
};

export const defaultQuestionImageProps: QuestionImageProps = {
  src: '',
  alt: '图片',
  width: '100%',
  height: '',
  objectFit: 'contain',
  images: [],
  isHorizontal: false,
  isCenter: true,
};
