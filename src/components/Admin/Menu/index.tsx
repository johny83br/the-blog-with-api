'use client';

import clsx from 'clsx';
import {
  CirclePlus,
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName, setIsOpen]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg mb-8',
    'flex flex-col',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-4 [&>svg]:h-4 px-4 cursor-pointer rounded-lg',
    'flex items-center justify-start gap-2',
    'transition hover:bg-slate-800',
    'h-10',
    'shrink-0',
  );

  const openCloseBtnClasses = clsx(
    linkClasses,
    'text-blue-200 italic',
    'sm:hidden',
  );

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(s => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/posts'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/posts/new'>
        <CirclePlus />
        Novo Post
      </Link>
    </nav>
  );
}
