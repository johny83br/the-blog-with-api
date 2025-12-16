import { PostCoverImage } from '../PostCoverImage';
import { PostInfo } from '../PostInfo';
import { findAllPublicPostsCached } from '@/lib/post/queries';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
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
