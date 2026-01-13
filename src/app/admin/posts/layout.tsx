import { MenuAdmin } from '@/components/Admin/Menu';

export default function AdminPostLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
