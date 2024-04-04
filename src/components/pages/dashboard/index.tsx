import ProtectedRoute from '@/components/ProtectedRoute';
import AppBar from '@/components/AppBar';
import Sidebar from '@/components/Sidebar';
import PageContainer from '@/components/PageContainer';
import { ToastContainer } from 'react-toastify';

export default function DashboardPage({ children }) {
    return (
        <ProtectedRoute>
            <AppBar />
            <Sidebar />
            <ToastContainer />
            <PageContainer>
                <div className="lg:pl-72 pt-12 flex-grow flex-1 flex-col">
                    <div className="py-4">{children}</div>
                </div>
            </PageContainer>
        </ProtectedRoute>
    );
}
