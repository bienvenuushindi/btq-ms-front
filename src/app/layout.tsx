import './globals.css'
import RouteTransitionProvider from '@/components/navigation/RouteTransitionProvider';
import {BRAND_NAME, BRAND_TAGLINE} from '@/lib/brand';

export const metadata = {
  title: BRAND_NAME,
  description: `${BRAND_NAME} marketplace admin dashboard. ${BRAND_TAGLINE}`,
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
