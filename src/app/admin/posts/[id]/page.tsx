import NotFoundPage from '@/app/not-found';
import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { Subtitle } from '@/components/Layouts/Subtitle';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar Post | Admin',
};

type AdminPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({ params }: AdminPostPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch();

  if (!post) NotFoundPage();

  const publicPost = makePublicPostFromDb(post);

  return (
    <>
      <Subtitle>Editar Post</Subtitle>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </>
  );
}
