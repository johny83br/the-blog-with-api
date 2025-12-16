import { PostCoverImage } from '../PostCoverImage';
import { PostInfo } from '../PostInfo';
import { findAllPublicPostsCached } from '@/lib/post/queries';

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

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
