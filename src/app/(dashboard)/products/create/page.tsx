import {ProductForm} from '@/components/ProductForm';
import Container from '@/components/Container';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateSupplier() {
  return (
      <ProtectedRoute>
          <Container>
              <ProductForm/>
          </Container>
      </ProtectedRoute>

  );
}