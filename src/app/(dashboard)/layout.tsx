import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';
import PageContainer from '@/components/PageContainer';
export default function DashboardRootLayout({children}) {
  return (
    <html lang="en">
    <head/>
    <body suppressHydrationWarning={true}>

    <div className="min-h-screen w-screen bg-neutral-50  overflow-x-hidden overflow-y-auto">
      <GlassPane className="w-full h-full flex">
        <PageContainer>
          <AppBar/>
          <Sidebar/>
          <div className="lg:pl-72 pt-12 flex-grow flex-1 flex-col ">
            <div className="py-4">
              {children}
            </div>
          </div>
        </PageContainer>
      </GlassPane>
    </div>
    </body>
    </html>
  );
}