import type { FC, CSSProperties } from 'react';
import { type QuestionImageProps, type ImageItem, defaultQuestionImageProps } from './types';

const parseSize = (value?: number | string): string | number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

interface ImageDisplayProps {
  image: ImageItem;
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  defaultObjectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const SingleImage: FC<ImageDisplayProps> = ({
  image,
  defaultWidth,
  defaultHeight,
  defaultObjectFit,
}) => {
  const { src, alt, width, height, objectFit } = image;

  const wrapperStyle: CSSProperties = {
    width: parseSize(width || defaultWidth) || '100%',
    height: parseSize(height || defaultHeight) || 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  };

  if (!src) {
    return (
      <div
        style={{
          ...wrapperStyle,
          minHeight: 120,
          border: '1px dashed #ccc',
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
          width: 'auto',
          maxWidth: '100%',
          height: parseSize(height || defaultHeight) || 'auto',
          objectFit: objectFit || defaultObjectFit || 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

const QuestionImage: FC<QuestionImageProps> = (props: QuestionImageProps) => {
  const { src, alt, width, height, objectFit, images, isHorizontal, isCenter } = {
    ...defaultQuestionImageProps,
    ...props,
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal ? 'wrap' : 'nowrap',
    gap: 12,
    justifyContent: isCenter ? 'center' : 'flex-start',
    alignItems: isCenter ? 'center' : 'stretch',
  };

  const itemStyle: CSSProperties = isHorizontal
    ? { flex: '0 0 auto', maxWidth: '100%' }
    : { width: '100%', display: 'flex', justifyContent: 'center' };

  // 展示多张图片
  if (images && images.length > 0) {
    return (
      <div style={containerStyle}>
        {images.map(image => (
          <div key={image.id} style={itemStyle}>
            <SingleImage
              image={image}
              defaultWidth={width}
              defaultHeight={height}
              defaultObjectFit={objectFit}
            />
          </div>
        ))}
      </div>
    );
  }

  // 兼容旧数据：单张图片
  const singleImage: ImageItem = {
    id: 'legacy',
    src: src || '',
    alt,
    width,
    height,
    objectFit,
  };

  return (
    <div style={containerStyle}>
      <div style={itemStyle}>
        <SingleImage
          image={singleImage}
          defaultWidth={width}
          defaultHeight={height}
          defaultObjectFit={objectFit}
        />
      </div>
    </div>
  );
};

export default QuestionImage;
