import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="absolute left-0 top-0 w-full p-6 text-center text-white">
        <Link href="/">
          <span className="text-2xl font-bold">Home</span>
        </Link>
      </nav>
      <main className="flex min-h-screen items-center justify-center bg-slate-900">
        {children}
      </main>
    </div>
  );
}
