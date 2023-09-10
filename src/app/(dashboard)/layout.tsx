import '@/styles/global.css';
import GlassPane from '@/components/GlassPane';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';
import PageContainer from '@/components/PageContainer';
import {createContext, useContext} from 'react';
// export const ThemeContext = createContext(null);

export default function DashboardRootLayout({children}) {
  // const {color,setColor} = useContext(ThemeContext)
  return (
    <html lang="en">
    <head/>
    <body suppressHydrationWarning={true}>

    <div className="h-screen w-screen bg-neutral-50  overflow-x-hidden">
      <GlassPane className="w-full h-full flex">
        <PageContainer>
          <AppBar/>
          <Sidebar/>
          {/*w-[calc(100%-288px)]*/}
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