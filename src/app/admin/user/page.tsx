import { UpdateUser } from '@/components/Admin/UpdateUser';
import { Subtitle } from '@/components/Layouts/Subtitle';
import { SpinLoader } from '@/components/Others/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Seus Dados',
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <Subtitle>Seus Dados</Subtitle>
      <UpdateUser />
    </Suspense>
  );
}
