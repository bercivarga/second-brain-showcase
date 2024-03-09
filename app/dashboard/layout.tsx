import { UserButton } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen divide-x">
      <aside className="flex h-full w-64 flex-col justify-between bg-indigo-50 p-6">
        <div>
          <span>TODO: Add sidebar menu</span>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>
      {children}
    </div>
  );
}
