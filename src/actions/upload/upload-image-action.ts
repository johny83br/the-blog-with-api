'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMAGE_UPLOAD_MAX_SIZE,
} from '@/lib/constants';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
};

export async function UploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  // TODO: Verificar se o usuário está logado

  const makeResult = ({ url = '' }) => ({ url });

  if (!(formData instanceof FormData)) {
    throw new Error('Dados inválidos');
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    throw new Error('Arquivo inválido');
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    throw new Error('Arquivo muito grande');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Imagem inválida');
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(
    process.cwd(),
    'public',
    IMAGE_UPLOAD_DIRECTORY,
  );
  await mkdir(uploadFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  return makeResult({ url: `${IMAGE_SERVER_URL}/${uniqueImageName}` });
}
