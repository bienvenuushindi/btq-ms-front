'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Container from '@/components/utils/wrappers/Container';
import ContainerOne from '@/components/utils/wrappers/ContainerOne';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const settingsFields = [
  ['Platform Name', 'OasisMarket'],
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
          <Card className="w-full max-w-4xl rounded-[30px] border-slate-200/90 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
            <CardHeader className="border-b border-slate-200/90 pb-6">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Platform settings</p>
              <CardTitle className="font-display text-4xl font-bold text-slate-900">OasisMarket Controls</CardTitle>
              <CardDescription>
                Core operating defaults for the marketplace workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-5 md:grid-cols-2">
                {settingsFields.map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">{label}</label>
                    <div className="oasis-input rounded-2xl px-4 py-3 text-base text-slate-800">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button className="oasis-button rounded-2xl px-5 py-3 text-sm font-semibold text-white">
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
