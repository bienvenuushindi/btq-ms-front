import './globals.css'
import RouteTransitionProvider from '@/components/navigation/RouteTransitionProvider';
import {BRAND_NAME, BRAND_TAGLINE} from '@/lib/brand';
import {Suspense} from 'react';

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
        <Suspense fallback={null}>
          <RouteTransitionProvider>{children}</RouteTransitionProvider>
        </Suspense>
      </body>
    </html>
  )
}
