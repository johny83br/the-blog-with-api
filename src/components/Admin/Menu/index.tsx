'use client';

import { LogoutAction } from '@/actions/login/logout-action';
import clsx from 'clsx';
import {
  CirclePlus,
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  UserPenIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await LogoutAction();
    });
  }

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

      <Link className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </Link>

      <Link className={linkClasses} href='/admin/posts'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/posts/new'>
        <CirclePlus />
        Criar Post
      </Link>

      <Link className={linkClasses} href='/admin/user'>
        <UserPenIcon />
        Seus Dados
      </Link>

      <a href='#' onClick={handleLogout} className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}
        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
