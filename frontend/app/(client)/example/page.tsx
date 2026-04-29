import ClientLayout from "@/modules/client/common/layouts/ClientLayout"; // Đường dẫn đúng theo module
import ExampleClientPage from "@/modules/client/pages/ExampleClientPage"; // Đường dẫn đúng theo module

export default function ExampleClient() {
  return (
    <ClientLayout>
      <ExampleClientPage />
    </ClientLayout>
  );
}
