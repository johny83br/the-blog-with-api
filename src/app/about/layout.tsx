export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <h1>Aqui vem o layout do about</h1>
      {children}
    </>
  );
}
