import SideNav from "./side-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen divide-x">
      <SideNav />
      <div className="w-full">{children}</div>
    </div>
  );
}
