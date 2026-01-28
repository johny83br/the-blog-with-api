import { UpdatePasswordForm } from '@/components/Admin/UpdateUserPassword';
import { Subtitle } from '@/components/Layouts/Subtitle';
import { SpinLoader } from '@/components/Others/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trocar senha',
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <Subtitle>Trocar senha</Subtitle>
      <UpdatePasswordForm />
    </Suspense>
  );
}
