'use client';

import { ImageUpIcon } from 'lucide-react';
import { Button } from '../Button';
import { useRef, useState, useTransition } from 'react';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { toast } from 'react-toastify';
import { UploadImageAction } from '@/actions/upload/upload-image-action';

type ImageProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFiles() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = (IMAGE_UPLOAD_MAX_SIZE / 1024).toFixed(2);
      toast.error(`Imagem muito grande. Máx.: ${readableMaxSize}KB`);
      setImgUrl('');
      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      try {
        const result = await UploadImageAction(formData);

        setImgUrl(result.url);

        toast.success('Imagem enviada');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
        setImgUrl('');
        return;
      }
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        type='button'
        className='self-start'
        variant='ghost'
        onClick={handleChooseFiles}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img src={imgUrl} className='rounded' />
        </div>
      )}

      <input
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
