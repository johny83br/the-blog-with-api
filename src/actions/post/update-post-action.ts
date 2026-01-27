'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/schemas';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandomString } from '@/utils/make-random-string';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidatePath, revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function UpdatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());

  if (!isAuthenticated) {
    return {
      errors: ['Faça login em outra aba antes de salvar.'],
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const zodParsedObject = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObject.success) {
    const msgErrors = getZodErrorMessages(zodParsedObject.error);
    return {
      errors: msgErrors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObject.data;
  const newPost: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
    ...validPostData,
  };

  let post;

  try {
    post = await postRepository.update(id, newPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [error.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts', 'seconds');
  revalidateTag(`post-${post.slug}`, 'seconds');
  revalidatePath('/admin/posts');

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
