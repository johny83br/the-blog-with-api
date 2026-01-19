'use client';

import { Button } from '@/components/Forms/Button';
import { InputCheckbox } from '@/components/Forms/InputCheckbox';
import { InputText } from '@/components/Forms/InputText';
import { MarkdownEditor } from '@/components/Forms/MarkdownEditor';
import { ImageUploader } from '../../Forms/ImageUploader';
import React from 'react';
import { PublicPost } from '@/dto/post/dto';

export const dynamic = 'force-dynamic';

type ManagePostFormProps = {
  publicPost: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [content, setContent] = React.useState(publicPost?.content || '');

  return (
    <form method='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={publicPost?.id || ''}
          readOnly
        />

        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          defaultValue={publicPost?.slug || ''}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={publicPost?.author || ''}
        />

        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título'
          type='text'
          defaultValue={publicPost?.title || ''}
        />

        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo'
          type='text'
          defaultValue={publicPost?.excerpt || ''}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={content}
          setValue={setContent}
        />

        <ImageUploader />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem'
          type='text'
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <InputCheckbox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={publicPost?.published || false}
        />

        <div className='mt-8'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
