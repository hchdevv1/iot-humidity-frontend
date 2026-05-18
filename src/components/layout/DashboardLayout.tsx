import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 px-6 py-5">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}