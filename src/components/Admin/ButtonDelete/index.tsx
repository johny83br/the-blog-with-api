'use client';

import { DeletePostAction } from '@/actions/post/delete-post-action';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeleteButtonProps = {
  id: string;
  title: string;
};

export function ButtonDeleteAdmin({ id, title }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      setShowDialog(false);
      try {
        await DeletePostAction(id);
        toast.success('Post apagado com sucesso!');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : String(error));
        return;
      }
    });
  }

  return (
    <>
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
      <Dialog
        isVisible={showDialog}
        title='Confirmação de remoção'
        content={`Tem certeza que deseja apagar o post: "${title}"? Esta ação não pode ser desfeita.`}
        onCancel={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        disabled={isPending}
      />
    </>
  );
}
