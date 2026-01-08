import { formatHour } from '@/utils/format-datetime';

// export const dynamic = 'force-dynamic'; // This page always renders on the server as dynamic
// export const dynamic = 'force-static'; // This page always renders on the server as static

export const dynamicParams = false; // Enable dynamic route segments

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function ExemploPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hour = formatHour(Date.now());

  return (
    <main className='min-h-[600px] text-4xl font-bold'>
      <div>
        Hora: {hour} (ID: {id})
      </div>
    </main>
  );
}
