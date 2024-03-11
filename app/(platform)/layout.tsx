import SideNav from "./side-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen max-h-screen divide-x">
      <SideNav />
      <div className="h-full max-h-full w-full overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
