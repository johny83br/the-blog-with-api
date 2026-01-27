'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function CreatePostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  const zodParsedObject = CreatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      errors: ['Faça login em outra aba antes de salvar.'],
      formState: PublicPostForApiSchema.parse(formDataToObj),
    };
  }

  if (!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error);
    return {
      errors,
      formState: PublicPostForApiSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObject.data;

  const createPostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!createPostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;

  revalidateTag('posts', 'seconds');
  redirect(`/admin/posts/${createdPost.id}?created=1`);
}
