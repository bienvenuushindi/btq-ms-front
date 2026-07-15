'use client';
import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/sections/menu-sidebar/Sidebar';
import AppBar from '@/components/AppBar';
import PageContainer from '@/components/sections/sidebar/PageContainer';
import {ToastContainer} from 'react-toastify';
import {Suspense, useState} from "react";
import Loading from "@/app/(dashboard)/loading";
import MobileBottomNav from '@/components/MobileBottomNav';

export default function DashboardRootLayout({children}: {
    children: React.ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="dashboard-mobile-shell min-h-screen w-full overflow-x-hidden bg-white lg:bg-background">
            <GlassPane className="w-full flex">
                <PageContainer>
                            <AppBar
                                onNavOpen={() => setIsMobileSidebarOpen((prev) => !prev)}
                                onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
                                isSidebarCollapsed={isSidebarCollapsed}
                            />
                            <Sidebar
                                open={isMobileSidebarOpen}
                                isCollapsed={isSidebarCollapsed}
                                onCloseMobile={() => setIsMobileSidebarOpen(false)}
                            />
                            <ToastContainer/>
                            <div
                                className={`flex min-w-0 flex-1 flex-col pb-20 pt-14 transition-[padding] duration-300 sm:pt-20 lg:pb-0 ${
                                    isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-64'
                                }`}
                            >
                                <div className="w-full min-w-0 px-4 py-4 sm:px-4 lg:px-6">
                                    <Suspense fallback={<Loading />}>
                                        {children}
                                    </Suspense>
                                </div>
                            </div>
                            <MobileBottomNav onMoreOpen={() => setIsMobileSidebarOpen(true)} />
                </PageContainer>
            </GlassPane>
        </div>
    );
}
