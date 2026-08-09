export type QuestionImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  onChange?: (newProps: QuestionImageProps) => void;
  disabled?: boolean;
};

export const defaultQuestionImageProps: QuestionImageProps = {
  src: '',
  alt: '图片',
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
};
