import { DashboardLayout } from "./_components/layout-wrapper";
import Sidebar from "./_components/sidebar";
import StateProvider from "./state";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StateProvider>
      <DashboardLayout>{children}</DashboardLayout>
      {/* <section className="flex">
        <Sidebar />
        <div>{children}</div>
      </section> */}
    </StateProvider>
  );
}
