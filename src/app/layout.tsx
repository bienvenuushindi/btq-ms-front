import './globals.css'
import RouteTransitionProvider from '@/components/navigation/RouteTransitionProvider';

export const metadata = {
  title: 'OasisMarket',
  description: 'OasisMarket operations dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RouteTransitionProvider>{children}</RouteTransitionProvider>
      </body>
    </html>
  )
}
