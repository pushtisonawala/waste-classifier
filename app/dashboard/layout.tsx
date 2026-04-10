import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[rgb(var(--bg-light))]">
      <Sidebar />
      <main className="flex-1">
        <div className="md:p-8 p-4 pt-16 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
