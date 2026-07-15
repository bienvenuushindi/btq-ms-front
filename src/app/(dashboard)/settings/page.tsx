'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {BRAND_NAME} from '@/lib/brand';

const settingsFields = [
  ['Platform Name', BRAND_NAME],
  ['Default Currency', 'USD'],
  ['Free Delivery Threshold', '50,000'],
  ['Default Delivery Fee', '2,000'],
  ['Loyalty Points Rate', '1 point per 1,000 spent'],
  ['Default Credit Limit', '100,000']
];

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <Container>
        <ContainerOne>
          <Card className="w-full min-w-0 max-w-4xl rounded-2xl border-slate-200/90 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:rounded-[30px]">
            <CardHeader className="border-b border-slate-200/90 px-3 pb-4 pt-4 sm:px-6 sm:pb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Platform settings</p>
              <CardTitle className="font-display text-xl font-bold text-slate-900 sm:text-4xl">{BRAND_NAME} Controls</CardTitle>
              <CardDescription>
                Core operating defaults for the marketplace workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pt-4 sm:px-6 sm:pt-6">
              <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
                {settingsFields.map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 sm:text-sm">{label}</label>
                    <div className="oasis-input rounded-xl px-3 py-2.5 text-sm text-slate-800 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-base">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 sm:mt-8">
                <button className="oasis-button w-full rounded-2xl px-4 py-2.5 text-sm font-semibold text-white sm:w-auto sm:px-5 sm:py-3">
                  Save Settings
                </button>
              </div>
            </CardContent>
          </Card>
        </ContainerOne>
      </Container>
    </ProtectedRoute>
  );
}
