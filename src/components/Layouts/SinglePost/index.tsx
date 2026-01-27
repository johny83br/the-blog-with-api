import { findPublicPostBySlugApiCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostHeading } from '../../Posts/PostHeading';
import { PostDate } from '../../Posts/PostDate';
import { SafeMarkdown } from '../../Posts/SafeMarkdown';
import ErrorMessage from '@/components/Others/ErrorMessage';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const postRes = await findPublicPostBySlugApiCached(slug);

  const noPostsFound = (
    <ErrorMessage
      contentTitle='Ops! 😅'
      content='Ainda não criamos nenhum post'
    />
  );

  if (!postRes.success) {
    return noPostsFound;
  }

  const post = postRes.data;

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className='rounded-xl'
          priority={true}
        />

        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

        <p>
          {post.author.name} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className='text-xl mb-4 text-slate-600 italic'>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
