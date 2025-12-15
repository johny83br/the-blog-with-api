import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Página não encontrada'
      contentTitle='Erro 404 😅'
      content='A página que você está tentando acessar não existe neste site.'
    />
  );
}
