'use client';

import { DeletePostAction } from '@/actions/post/delete-post-action';
import { logColor } from '@/utils/log-color';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type DeleteButtonProps = {
  id: string;
  title: string;
};

export function ButtonDeleteAdmin({ id, title }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const confirmed = window.confirm(
      `Tem certeza que deseja apagar o post: "${title}"? Esta ação não pode ser desfeita.`,
    );

    if (confirmed) {
      startTransition(async () => {
        const result = await DeletePostAction(id);

        alert(`Post com ID ${result} deletado com sucesso.`);
      });
    }

    // if (confirmed) {
    //   // Submitting the form programmatically
    //   const form = document.createElement('form');
    //   form.method = 'POST';
    //   form.action = '/admin/post/delete'; // Ajuste a URL conforme necessário

    //   const input = document.createElement('input');
    //   input.type = 'hidden';
    //   input.name = 'id';
    //   input.value = id;
    //   form.appendChild(input);

    //   document.body.appendChild(form);
    //   form.submit();
    // }
  }

  return (
    <button
      className={clsx(
        'bg-red-500',
        'hover:bg-red-700',
        'text-white',
        'font-bold',
        'py-2',
        'px-2',
        'rounded',
        'cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
      )}
      aria-label={`Apagar post: ${title}`}
      title={`Apagar post: ${title}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon size={16} />
    </button>
  );
}
