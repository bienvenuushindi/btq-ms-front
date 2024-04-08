import {SupplierForm} from '@/components/suppliers/SupplierForm';
import Container from '@/components/utils/wrappers/Container';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateProduct() {
  return (
      <ProtectedRoute>
          <Container>
              <SupplierForm/>
          </Container>
      </ProtectedRoute>
  );
}