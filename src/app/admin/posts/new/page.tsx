import { Button } from '@/components/Button';
import { BugIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <div>
      <div className='py-16 flex flex-wrap gap-4 items-center'>
        <Button variant='default' size='sm'>
          <BugIcon /> Funciona como o do JSX
        </Button>
        <Button variant='ghost' size='md'>
          <BugIcon /> Funciona como o do JSX
        </Button>
        <Button variant='danger' size='lg'>
          <BugIcon /> Funciona como o do JSX
        </Button>
      </div>

      <div className='py-16 flex flex-wrap gap-4 items-center'>
        <Button variant='default' size='sm'>
          Funciona como o do JSX
        </Button>
        <Button variant='ghost' size='md'>
          Funciona como o do JSX
        </Button>
        <Button variant='danger' size='lg'>
          Funciona como o do JSX
        </Button>
      </div>

      <div className='py-16 flex flex-wrap gap-4 items-center'>
        <Button variant='default' size='sm' disabled>
          <BugIcon /> Funciona como o do JSX
        </Button>
        <Button variant='ghost' size='md' disabled>
          <BugIcon /> Funciona como o do JSX
        </Button>
        <Button variant='danger' size='lg' disabled>
          <BugIcon /> Funciona como o do JSX
        </Button>
      </div>

      <div className='py-16 flex flex-wrap gap-4 items-center'>
        <Button variant='default' size='sm' className='w-full'>
          Funciona como o do JSX
        </Button>
        <Button variant='ghost' size='md' className='w-full'>
          Funciona como o do JSX
        </Button>
        <Button variant='danger' size='lg' className='w-full'>
          Funciona como o do JSX
        </Button>
      </div>
    </div>
  );
}
