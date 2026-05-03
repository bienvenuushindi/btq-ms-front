'use client';
import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/sections/menu-sidebar/Sidebar';
import AppBar from '@/components/AppBar';
import PageContainer from '@/components/sections/sidebar/PageContainer';
import {ToastContainer} from 'react-toastify';
import {Suspense, useState} from "react";
import Loading from "@/app/(dashboard)/loading";

export default function DashboardRootLayout({children}: {
    children: React.ReactNode
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen w-screen">
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
                                className={`flex flex-1 flex-col pt-16 transition-[padding] duration-300 ${
                                    isSidebarCollapsed ? 'lg:pl-24' : 'lg:pl-64'
                                }`}
                            >
                                <div className="px-3 py-5 lg:px-6">
                                    <Suspense fallback={<Loading />}>
                                        {children}
                                    </Suspense>
                                </div>
                            </div>
                </PageContainer>
            </GlassPane>
        </div>
    );
}
