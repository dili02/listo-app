"use client";

import { createContext, useContext, useState } from "react";

export interface InitialStateType {
  isSidebarCollapsed: boolean;
}

const initialState: InitialStateType = {
  isSidebarCollapsed: false,
};

interface StateContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StateContext = createContext<StateContextType | null>(null);

export function useStateContext() {
  const context = useContext(StateContext);

  if (!context) throw new Error("useStateContext must be provided");

  return context;
}

export default function StateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    initialState.isSidebarCollapsed
  );

  return (
    <StateContext.Provider
      value={{ isSidebarCollapsed, setIsSidebarCollapsed }}
    >
      {children}
    </StateContext.Provider>
  );
}
