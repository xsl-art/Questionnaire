import type { FC } from 'react';
import { type QuestionVideoProps, defaultQuestionVideoProps } from './types';

const QuestionVideo: FC<QuestionVideoProps> = (props: QuestionVideoProps) => {
  const { src, width, height, autoPlay, controls, loop, muted, poster } = {
    ...defaultQuestionVideoProps,
    ...props,
  };

  if (!src) {
    return (
      <div
        style={{
          width,
          height: height === 'auto' ? '180px' : height,
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        请配置视频地址
      </div>
    );
  }

  return (
    <video
      src={src}
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
      style={{
        width: typeof width === 'string' ? width : undefined,
        height: typeof height === 'string' ? height : undefined,
        display: 'block',
        maxWidth: '100%',
      }}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      poster={poster || undefined}
      preload="metadata"
    />
  );
};

export default QuestionVideo;
