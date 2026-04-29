import ClientLayout from "@/modules/client/common/layouts/ClientLayout"; // Đường dẫn đúng theo module
import RegisterPage from "@/modules/auth/pages/RegisterPage"; // Đường dẫn đúng theo module

export default function RegisterClient() {
  return (
    <ClientLayout>
      <RegisterPage />
    </ClientLayout>
  );
}
