import { CreateUserForm } from '@/components/Users/CreateUserForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Crie sua conta | Admin',
};

export default async function CreateUserPage() {
  return <CreateUserForm />;
}
