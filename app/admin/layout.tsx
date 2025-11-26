import AdminShell from "@/components/layout/admin/LayoutAdminShell";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
