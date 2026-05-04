'use client';

import { register, signin } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart2, CheckCircle, Package, Shield, Truck } from 'react-feather';
import { useCallback, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  linkCta: 'Sign in',
  eyebrow: 'New workspace',
  header: 'Create your OasisMarket account',
  subheader: 'Start managing products, suppliers, and requisitions from one admin workspace.',
  buttonText: 'Create Account',
  sideTitle: 'Build a calmer operations flow.',
  sideDescription: 'Set up your team and move from stock visibility to purchase action with the same dashboard tools you already trust.',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  linkCta: 'Register',
  eyebrow: 'Welcome back',
  header: 'Sign in to your dashboard',
  subheader: 'Pick up where you left off with your inventory, requisitions, and supplier activity.',
  buttonText: 'Sign In',
  sideTitle: 'Everything operational, in one place.',
  sideDescription: 'Review stock movement, supplier updates, and urgent requisitions from the same command center your team uses every day.',
};

const highlights = [
  {
    icon: Package,
    title: 'Stock visibility',
    description: 'See product movement and inventory health without switching tools.',
  },
  {
    icon: Truck,
    title: 'Supplier coordination',
    description: 'Track vendors, categories, and supply flow from a shared workspace.',
  },
  {
    icon: BarChart2,
    title: 'Requisition tracking',
    description: 'Keep approvals, totals, and daily activity close at hand.',
  },
];

const initial = { email: '', password: '', name: '', phone_number: '', role_id: 1 };

export default function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [, startTransition] = useTransition();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setSuccessMessage('');
      setIsSubmitting(true);

      const data = {
        user: formState,
      };

      try {
        if (mode === 'register') {
          await register(data);
        } else {
          await signin(data);
        }

        setSuccessMessage(mode === 'signin' ? 'Login successful.' : 'Account created successfully.');
        setIsRedirecting(true);
        startTransition(() => {
          router.replace('/home');
          router.refresh();
        });
        setFormState({ ...initial });
      } catch (e: any) {
        setError(e?.message || `Could not ${mode}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, mode, router, startTransition]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  if (isRedirecting) {
    return (
      <Card className="mx-auto w-full max-w-xl overflow-hidden rounded-[30px] border border-white/60 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
        <CardHeader className="items-center px-6 pb-2 pt-8 text-center md:px-10">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-[22px] bg-primary text-white shadow-[0_18px_34px_rgba(255,122,53,0.28)]">
            <CheckCircle className="h-7 w-7" />
          </div>
          <CardTitle className="font-display text-3xl font-bold text-slate-900">{successMessage}</CardTitle>
          <CardDescription className="max-w-md text-sm leading-6 text-slate-500 md:text-base">
            We&apos;re preparing your dashboard now.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-10 pt-4 md:px-10">
          <div className="mx-auto max-w-md">
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 animate-[pulse_1.1s_ease-in-out_infinite] rounded-full bg-primary" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">Redirecting to home...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid min-h-[640px] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/15 bg-white/8 shadow-[0_30px_90px_rgba(15,23,42,0.28)] backdrop-blur-sm lg:grid-cols-[1.08fr_0.92fr]">
      <section className="surface-dark relative hidden min-h-full overflow-hidden px-8 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,53,0.22),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_32%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[22px] bg-primary text-white shadow-[0_18px_34px_rgba(255,122,53,0.28)]">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-[2rem] font-bold leading-none text-white">OasisMarket</p>
              <p className="mt-1 text-sm text-slate-300">Admin Dashboard</p>
            </div>
          </div>
          <div className="mt-16 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-200">{content.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white xl:text-[3.35rem]">
              {content.sideTitle}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-200">
              {content.sideDescription}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12 space-y-4">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-[24px] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-orange-200">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-[24px] border border-orange-300/20 bg-orange-400/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">Secure team access</p>
                <p className="text-sm text-orange-100/90">
                  Use your account to enter the same branded workspace as the dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] px-5 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
        <Card className="h-full rounded-[30px] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          <CardHeader className="border-b border-slate-200/80 px-6 pb-6 pt-7 sm:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-[20px] bg-primary text-white shadow-[0_12px_24px_rgba(255,122,53,0.28)]">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-slate-900">OasisMarket</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Admin Dashboard</p>
              </div>
            </div>
            <div className="mt-5 lg:mt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{content.eyebrow}</p>
              <CardTitle className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-[2.2rem]">
                {content.header}
              </CardTitle>
              <CardDescription className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                {content.subheader}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-7 pt-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {successMessage && (
                <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              {mode === 'register' && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="full-name" className="text-sm font-semibold text-slate-700">
                      Full Name
                    </Label>
                    <Input
                      required
                      id="full-name"
                      placeholder="John Doe"
                      value={formState.name}
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-primary/20"
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="tel" className="text-sm font-semibold text-slate-700">
                      Phone Number
                    </Label>
                    <Input
                      required
                      type="tel"
                      id="tel"
                      placeholder="+243 000 000 000"
                      value={formState.phone_number}
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-primary/20"
                      onChange={(e) => setFormState((s) => ({ ...s, phone_number: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email Address
                </Label>
                <Input
                  required
                  type="email"
                  id="email"
                  placeholder="name@company.com"
                  value={formState.email}
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-primary/20"
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </Label>
                <Input
                  required
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formState.password}
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 placeholder:text-slate-400 focus-visible:border-primary focus-visible:ring-primary/20"
                  onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
                />
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-slate-500">
                    {content.linkText}{' '}
                    <Link href={content.linkUrl} className="font-semibold text-primary transition hover:text-orange-500">
                      {content.linkCta}
                    </Link>
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="oasis-button h-12 rounded-2xl px-6 text-sm font-semibold text-white hover:opacity-95"
                  >
                    {isSubmitting ? 'Please wait...' : content.buttonText}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
