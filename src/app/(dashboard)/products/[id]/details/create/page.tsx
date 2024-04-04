import {ProductDetailForm} from '@/components/ProductDetailForm';
import Container from '@/components/Container';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateProductDetail() {
    return (
        <ProtectedRoute>
            <Container>
                <ProductDetailForm/>
            </Container>
        </ProtectedRoute>
    );
};