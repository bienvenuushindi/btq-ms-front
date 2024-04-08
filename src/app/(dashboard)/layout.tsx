import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/sections/menu-sidebar/Sidebar';
import AppBar from '@/components/AppBar';
import PageContainer from '@/components/sections/sidebar/PageContainer';
import {ToastContainer} from 'react-toastify';
import {Suspense} from "react";
import Loading from "@/app/(dashboard)/loading";

export default function DashboardRootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head/>
        <body suppressHydrationWarning={true}>
        <div className="min-h-screen w-screen bg-neutral-50  overflow-x-hidden overflow-y-auto">
            <GlassPane className="w-full h-full flex">
                <PageContainer>
                            <AppBar/>
                            <Sidebar/>
                            <ToastContainer/>
                            <div className="lg:pl-60 pt-12 flex-grow flex-1 flex-col ">
                                <div className="py-4">
                                    <Suspense fallback={<Loading />}>
                                        {children}
                                    </Suspense>
                                </div>
                            </div>
                </PageContainer>
            </GlassPane>
        </div>
        </body>
        </html>
    );
}