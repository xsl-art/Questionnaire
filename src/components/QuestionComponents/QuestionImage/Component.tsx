import type { FC } from 'react';
import { type QuestionImageProps, defaultQuestionImageProps } from './types';

const QuestionImage: FC<QuestionImageProps> = (props: QuestionImageProps) => {
  const { src, alt, width, height, objectFit } = {
    ...defaultQuestionImageProps,
    ...props,
  };

  if (!src) {
    return (
      <div
        style={{
          width,
          height: height === 'auto' ? '120px' : height,
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
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit,
        display: 'block',
        maxWidth: '100%',
      }}
    />
  );
};

export default QuestionImage;
