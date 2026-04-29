import ClientLayout from "@/modules/client/common/layouts/ClientLayout"; // Đường dẫn đúng theo module
import LoginPage from "@/modules/auth/pages/LoginPage"; // Đường dẫn đúng theo module

export default function LoginClient() {
  return (
    <ClientLayout>
      <LoginPage />
    </ClientLayout>
  );
}
