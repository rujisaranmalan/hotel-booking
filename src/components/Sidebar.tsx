"use client";
import Link from "next/link";
import { Home, Search, Heart, User } from "lucide-react";
import { usePathname } from "next/navigation";

const Item = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const path = usePathname();
  const active = path === href || (href !== "/" && path.startsWith(href));
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 transition select-none
        ${active ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
    >
      <Icon size={18} />
      <span className="hidden lg:inline">{label}</span>
    </Link>
  );
};

export function Sidebar() {
  return (
    <aside className="sticky top-0 h-dvh w-[70px] lg:w-56 shrink-0 bg-primary-700 px-3 lg:px-4 py-6">
      <div className="flex flex-col h-full">
        <Link href="/" className="text-white font-semibold text-lg px-2 lg:px-3 mb-6">travela.</Link>
        <nav className="flex flex-col gap-2">
          <Item href="/" icon={Home} label="Home" />
          <Item href="/explore" icon={Search} label="Explore" />
          <Item href="/trips" icon={Heart} label="Trips" />
          <Item href="/profile" icon={User} label="Profile" />
        </nav>
        <div className="mt-auto text-white/60 text-xs px-2 lg:px-3">
          © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
