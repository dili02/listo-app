"use client";

import {
  Archive,
  ArrowLeftToLine,
  ArrowRightToLine,
  CircleDollarSign,
  Clipboard,
  Clock,
  Home,
  Layers3,
  ListCollapse,
  LucideIcon,
  SlidersHorizontal,
  User,
} from "lucide-react";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStateContext } from "../state";
import { Button } from "@/components/ui/button";

type Props = {};

export default function Sidebar({}: Props) {
  const state = useStateContext();

  const handleSidebarCollapse = () =>
    state.setIsSidebarCollapsed(!state.isSidebarCollapsed);

  const sidebarClassNames = `fixed flex flex-col transition-all duration-300  overflow-hidden h-full shadow-md z-40 ${
    state.isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }`;

  return (
    <div className={sidebarClassNames}>
      <div
        // className={`flex gap-3 justify-between md:justify-normal items-center pt-9 ${
        //   state.isSidebarCollapsed ? "px-5" : "px-8"
        // }`}
        className={`flex items-center ${
          state.isSidebarCollapsed ? "justify-center" : "justify-end"
        } mt-4`}
      >
        <Button size="icon" onClick={handleSidebarCollapse} className="">
          {state.isSidebarCollapsed ? (
            <ArrowRightToLine className="h-5 w-5" />
          ) : (
            <ArrowLeftToLine className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* BRAND */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-9 ${
          state.isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Clock className={`${state.isSidebarCollapsed ? "block" : "hidden"}`} />

        <h1
          className={`flex items-center text-2xl ${
            state.isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          <span className="font-extrabold">list</span>
          <span>
            <Clock className="w-4 h-4" strokeWidth={4} />
          </span>
          <span>Smart</span>
        </h1>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Home}
          label="Dashboard"
          isCollapsed={state.isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={state.isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={state.isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={state.isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={state.isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={state.isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      {/* <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center">&copy; 2024, Stock App</p>
      </div> */}
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-black hover:bg-gray-500 gap-3 transition-colors ${
          isActive ? "text-white bg-black" : ""
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className={`${isCollapsed ? "hidden" : "block"}`}>{label}</span>
      </div>
    </Link>
  );
}
