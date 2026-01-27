import ErrorMessage from '../../Others/ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostInfo } from '../PostInfo';
import { findAllPublicPostsApiCached } from '@/lib/post/queries/public';

export async function PostFeatured() {
  const postsRes = await findAllPublicPostsApiCached();

  if (!postsRes.success) {
    return null;
  }

  const posts = postsRes.data;

  if (posts.length <= 0) {
    return null;
  }

  const post = posts[0];

  const link = `/post/${post.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-8 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{ href: link }}
        imageProps={{
          width: 1200,
          height: 720,
          src: post.coverImageUrl,
          alt: post.title,
          priority: true,
        }}
      />
      <PostInfo dateTime={post.createdAt} url={link} title={post.title} as='h1'>
        {post.excerpt}
      </PostInfo>
    </section>
  );
}
