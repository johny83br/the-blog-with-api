'use server';

import { IMAGE_SERVER_URL, IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function UploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const isAuthenticated = await getLoginSessionForApi();

  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente em outra aba.' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makeResult({ url });
}
