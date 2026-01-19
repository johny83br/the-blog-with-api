'use client';

import { ImageUpIcon } from 'lucide-react';
import { Button } from '../Button';
import { useRef, useTransition } from 'react';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { toast } from 'react-toastify';
import { UploadImageAction } from '@/actions/upload/upload-image-action';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  function handleChooseFiles() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Imagem muito grande. Máx.: ${readableMaxSize}KB`);
      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      try {
        const result = await UploadImageAction(formData);

        // TODO: continuar depois
        toast.success(result.url);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
        return;
      }
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-3'>
      <Button
        type='button'
        className='self-start'
        variant='ghost'
        onClick={handleChooseFiles}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      <input
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        onChange={handleChange}
      />
    </div>
  );
}
