'use client';

import { Button } from '@/components/Forms/Button';
import { InputCheckbox } from '@/components/Forms/InputCheckbox';
import { InputText } from '@/components/Forms/InputText';
import { MarkdownEditor } from '@/components/Forms/MarkdownEditor';
import { ImageUploader } from '../../Forms/ImageUploader';
import { useActionState, useEffect, useState } from 'react';
import { CreatePostAction } from '@/actions/post/create-post-action';
import { toast } from 'react-toastify';
import { UpdatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@/lib/post/schemas';

export const dynamic = 'force-dynamic';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPostForApiDto;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;

  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;

  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: UpdatePostAction,
    create: CreatePostAction,
  };

  const initialState = {
    formState: PublicPostForApiSchema.parse(publicPost || {}),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [router, created]);

  const { formState } = state;
  const [content, setContent] = useState(publicPost?.content || '');

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={isPending}
          textAreaName='content'
          value={content}
          setValue={setContent}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        {mode === 'update' && (
          <InputCheckbox
            labelText='Publicar?'
            name='published'
            type='checkbox'
            defaultChecked={formState.published}
            disabled={isPending}
          />
        )}

        <div className='mt-8'>
          <Button type='submit' disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
