'use server';

import { postRepository } from '@/repositories/post';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function DeletePostAction(id: string) {
  if (!id || typeof id !== 'string') {
    throw new Error('ID do post inválido.');
  }

  //TODO: Checar login do usuário

  let post;

  try {
    post = await postRepository.delete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Erro desconhecido',
    };
  }

  revalidateTag('posts', 'seconds');
  revalidateTag(`post-${post.slug}`, 'seconds');
  revalidatePath('/admin/posts');

  return {
    error: '',
  };
}
