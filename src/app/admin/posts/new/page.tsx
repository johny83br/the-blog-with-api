import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { Subtitle } from '@/components/Layouts/Subtitle';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Criar Post | Admin',
};

export default async function AdminPostNewPage() {
  return (
    <>
      <Subtitle>Criar Post</Subtitle>
      <ManagePostForm mode='create' />
    </>
  );
}
