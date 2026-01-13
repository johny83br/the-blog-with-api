import Link from 'next/link';

export function MenuAdmin() {
  return (
    <nav>
      <a href='/' target='_blank'>
        Home
      </a>

      <Link href='/admin/posts'>Posts</Link>
    </nav>
  );
}
