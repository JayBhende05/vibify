import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";


 function DashboardLayout({ children }: {children : React.ReactNode}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout