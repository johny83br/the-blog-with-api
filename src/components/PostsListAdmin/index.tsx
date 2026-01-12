import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();

  return (
    <div className='mb-16'>
      {posts.map(post => (
        <div
          key={post.id}
          className={clsx(
            'py-2 px-2',
            !post.published && 'bg-slate-300',
            'flex gap-2 items-center justify-between',
            !post.published ? 'hover:bg-slate-300' : 'hover:bg-slate-200',
          )}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className='ml-2 text-xs text-slate-600 italic'>
              (Não publicado)
            </span>
          )}

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
            )}
            aria-label={`Apagar post: ${post.title}`}
            title={`Apagar post: ${post.title}`}
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
