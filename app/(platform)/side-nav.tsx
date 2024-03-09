import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import navItems from "./navItems";
import SearchBar from "./search-bar";

export default function SideNav() {
  return (
    <aside className="flex h-full w-64 flex-col justify-between bg-slate-100/50 p-6">
      <div className="flex flex-col items-stretch gap-4">
        <SearchBar />
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button className="w-full justify-start" variant={"secondary"}>
              <item.icon className="mr-3" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
