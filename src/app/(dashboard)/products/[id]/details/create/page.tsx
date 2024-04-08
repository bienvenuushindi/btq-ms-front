import {ProductDetailForm} from '@/components/ProductDetailForm';
import Container from '@/components/utils/wrappers/Container';
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