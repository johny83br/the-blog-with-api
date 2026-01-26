'use server';

import { ALLOW_LOGIN, LOGIN_PASS, LOGIN_USER } from '@/lib/constants';
import { verifyPassword } from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { asyncDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function LoginAction(state: LoginActionState, formData: FormData) {
  if (!ALLOW_LOGIN) {
    return {
      email: '',
      errors: ['Login não habilitado'],
    };
  }

  await asyncDelay(5000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  if (!email || !password) {
    return {
      email,
      errors: ['Digite o usuário e a senha'],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  console.log(loginResponse.data);

  // await createLoginSession(email);

  // redirect('/admin/posts');

  return {
    email: formEmail,
    errors: ['Success'],
  };
}
