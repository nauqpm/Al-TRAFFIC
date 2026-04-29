import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { ReactNode } from "react";

interface LayoutAdminProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutAdminProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Thanh điều hướng trên cùng */}
      <AdminNavbar />

      <div className="flex flex-1">
        {/* Sidebar bên trái chiếm 25% */}
        <aside className="w-1/4 bg-gray-200 p-4">
          <AdminSidebar />
        </aside>

        {/* Nội dung chính bên phải chiếm 75% */}
        <main className="w-3/4 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
