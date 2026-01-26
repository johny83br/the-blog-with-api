import { API_URL } from '@/lib/constants';

type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${API_URL}${path}`;

  try {
    const res = await fetch(url, options);
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json?.message || 'Erro inesperado'];

      return {
        errors,
        success: false,
        status: res.status,
      };
    }

    return {
      data: json,
      success: true,
      status: res.status,
    };
  } catch (error) {
    console.log(error);

    return {
      errors: ['Falha ao conectar-se ao servidor'],
      success: false,
      status: 500,
    };
  }
}
