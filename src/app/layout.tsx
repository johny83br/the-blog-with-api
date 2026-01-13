import type { Metadata } from 'next';
import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';

export const metadata: Metadata = {
  title: {
    default: 'Este é um blog com Next.js | The Blog',
    template: '%s | The Blog',
  },
  description: 'Essa seria a descrição da página.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR' className='dark'>
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
