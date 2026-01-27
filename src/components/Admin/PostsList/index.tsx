import {
  findAllPostAdmin,
  findAllPostFromApiAdmin,
} from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { ButtonDeleteAdmin } from '../ButtonDelete';
import ErrorMessage from '@/components/Others/ErrorMessage';

export default async function PostsListAdmin() {
  const postsRes = await findAllPostFromApiAdmin();

  if (!postsRes.success) {
    console.log(postsRes.errors);

    return (
      <ErrorMessage
        contentTitle='Ei 😅'
        content='Tente fazer login novamente'
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle='Ei 😅' content='Bora criar algum post??' />
    );
  }

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
          <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className='ml-2 text-xs text-slate-600 italic'>
              (Não publicado)
            </span>
          )}

          <ButtonDeleteAdmin title={post.title} id={post.id} />
        </div>
      ))}
    </div>
  );
}
