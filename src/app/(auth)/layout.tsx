import '@/styles/global.css'
import GlassPane from '@/components/GlassPane';

export default function AuthRootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head/>
        <body>
        <div className="min-h-screen w-screen bg-[linear-gradient(135deg,#17384a_0%,#21475a_42%,#f1f5f9_42%,#e2e8f0_100%)] p-3 sm:p-5 lg:p-6">
            <GlassPane className="w-full min-h-[calc(100vh-1.5rem)] items-center justify-center sm:min-h-[calc(100vh-2.5rem)] lg:min-h-[calc(100vh-3rem)]">
                {children}
            </GlassPane>
        </div>
        </body>
        </html>
    );
}
