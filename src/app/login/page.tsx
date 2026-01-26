import { LoginForm } from '@/components/Admin/LoginForm';
import ErrorMessage from '@/components/Others/ErrorMessage';
import { ALLOW_LOGIN } from '@/lib/constants';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login | Admin',
};

export default async function AdminLoginPage() {
  if (!ALLOW_LOGIN) {
    return (
      <ErrorMessage
        contentTitle='Erro 403 😅'
        content='Libere o login usando ALLOW_LOGIN'
      />
    );
  }
  return <LoginForm />;
}
