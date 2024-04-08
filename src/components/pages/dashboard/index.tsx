import ProtectedRoute from '@/components/ProtectedRoute';
import AppBar from '@/components/AppBar';
import Sidebar from '@/components/sections/menu-sidebar/Sidebar';
import PageContainer from '@/components/sections/sidebar/PageContainer';
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
