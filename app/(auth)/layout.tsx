export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="flex min-h-screen items-center justify-center bg-slate-900">
        {children}
      </main>
    </div>
  );
}
