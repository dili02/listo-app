"use client";

import React from "react";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";
import { useStateContext } from "../state";

type Props = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: Props) {
  const state = useStateContext();

  return (
    <div className={`flex w-full min-h-screen`}>
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full px-9 ${
          state.isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <TopBar />
        {children}
      </main>
    </div>
  );
}

// export default function DashboardWrapper({ children }: Props) {
//   return (
//     <StoreProvider>
//       <DashboardLayout>{children}</DashboardLayout>
//     </StoreProvider>
//   );
// }
