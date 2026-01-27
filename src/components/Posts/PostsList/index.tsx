import ErrorMessage from '../../Others/ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostInfo } from '../PostInfo';
import { findAllPublicPostsApiCached } from '@/lib/post/queries/public';

export async function PostsList() {
  const postsRes = await findAllPublicPostsApiCached();

  const noPostsFound = (
    <ErrorMessage
      contentTitle='Ops! 😅'
      content='Ainda não criamos nenhum post'
    />
  );

  if (!postsRes.success) {
    return noPostsFound;
  }

  const posts = postsRes.data;

  if (posts.length <= 1) return null;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
      {posts.slice(1).map(post => {
        const link = `/post/${post.slug}`;

        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              linkProps={{ href: link }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />

            <PostInfo
              dateTime={post.createdAt}
              url={link}
              title={post.title}
              as='h2'
            >
              {post.excerpt}
            </PostInfo>
          </div>
        );
      })}
    </div>
  );
}
