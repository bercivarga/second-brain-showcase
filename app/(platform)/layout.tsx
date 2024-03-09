import SideNav from "./side-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen divide-x">
      <SideNav />
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}
