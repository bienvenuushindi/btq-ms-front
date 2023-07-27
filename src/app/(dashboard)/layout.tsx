import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';

export default function DashboardRootLayout({children}) {
  return (
    <html lang="en">
    <head/>
    <body>
    <div className="h-screen w-screen rainbow-mesh p-6">
      <div>
      </div>
      <GlassPane className="w-full h-full flex items-center justify-center">
        <Sidebar/>
        <div className="grow flex flex-col h-full items-center justify-center">
          <div className="w-full">
            <AppBar />
          </div>
          <div className="grow w-full bg-white text-black m-2    overflow-y-scroll">
            {children}
          </div>
        </div>

      </GlassPane>
    </div>
    </body>
    </html>
  );
}