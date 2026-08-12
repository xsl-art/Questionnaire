import httpInstance, { type ResDataType } from '../service/index';

export type UploadImageResult = {
  url: string;
};

export type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
};

/**
 * 使用 canvas 对图片进行压缩
 * @param file 原始图片文件
 * @param options 压缩参数
 */
export const compressImage = (file: File, options: CompressOptions = {}): Promise<Blob> => {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.8, mimeType = 'image/jpeg' } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法获取 Canvas 上下文'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('图片压缩失败'));
            }
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => reject(new Error('图片加载失败'));
      img.src = (event.target?.result as string) || '';
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsDataURL(file);
  });
};

/**
 * 上传单张图片（默认先压缩）
 * @param file 图片文件
 * @param options 是否压缩及压缩参数
 */
export const uploadImageService = async (
  file: File,
  options: CompressOptions & { compress?: boolean } = {}
): Promise<UploadImageResult> => {
  const { compress = true, ...compressOptions } = options;
  const blob = compress ? await compressImage(file, compressOptions) : file;

  const formData = new FormData();
  formData.append('file', blob, file.name);

  const data = (await httpInstance.post('/api/upload/image', formData)) as ResDataType;
  let url = data.url as string;
  if (url && url.startsWith('/')) {
    url = `http://localhost:3005${url}`;
  }
  return { url };
};
