import type { FC, CSSProperties } from 'react';
import { type QuestionImageProps, defaultQuestionImageProps } from './types';

const parseSize = (value?: number | string): string | number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const QuestionImage: FC<QuestionImageProps> = (props: QuestionImageProps) => {
  const { src, alt, width, height, objectFit } = {
    ...defaultQuestionImageProps,
    ...props,
  };

  const wrapperStyle: CSSProperties = {
    width: parseSize(width) || '100%',
    height: parseSize(height) || 'auto',
  };

  if (!src) {
    return (
      <div
        style={{
          ...wrapperStyle,
          minHeight: 120,
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        请配置图片地址
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: parseSize(height) || '100%',
          objectFit,
          display: 'block',
        }}
      />
    </div>
  );
};

export default QuestionImage;
