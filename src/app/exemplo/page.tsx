import { formatHour } from '@/utils/format-datetime';

export const dynamic = 'force-dynamic'; // This page always renders on the server as dynamic
// export const dynamic = 'force-static'; // This page always renders on the server as static

export default async function ExemploPage() {
  const hour = formatHour(Date.now());

  return (
    <main className='min-h-[600px] text-4xl font-bold'>
      <div>Hora: {hour}</div>
    </main>
  );
}
