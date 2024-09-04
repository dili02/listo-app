"use client";

import { cn } from "@/lib/utils";
import { Layers, List, Banknote, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const links = [
  { icon: House, href: "/tablero", label: "Tablero" },
  { icon: List, href: "/listas", label: "Listas" },
  { icon: Layers, href: "/categorias", label: "Categorias" },
  { icon: Banknote, href: "/suscripcion", label: "Suscripcion" },
];

export default function SidebarNavigation({}: Props) {
  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="mb-2 md:p-6">
        {links.map((link) => (
          <SidebarNavigationItem key={link.href} {...link} />
        ))}
      </nav>
    </div>
  );
}

function SidebarNavigationItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const pathname = usePathname();

  const activepath = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        `flex items-center gap-2 hover:bg-primary/15 p-2 rounded-lg cursor-pointer transition-all duration-300 my-3`,
        activepath && `bg-primary text-primary-foreground hover:text-primary`
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
