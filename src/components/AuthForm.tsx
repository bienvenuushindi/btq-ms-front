'use client';
import {register, signin} from '@/lib/api';
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// import Card from '@/components/utils/wrappers/Card';
import {useCallback, useState, useTransition} from 'react';
import Link from 'next/link';



const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create an Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: 'Don\'t have an account?',
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

const initial = {email: '', password: '', name: '', phone_number: '', role_id: 1};

export default function AuthForm({mode}: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({...initial});
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
        user: formState
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
        setFormState({...initial});
      } catch (e: any) {
        setError(e?.message || `Could not ${mode}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formState,
      formState.email,
      formState.password,
      formState.name,
      formState.phone_number,
      mode,
      router,
      startTransition
    ]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  if (isRedirecting) {
    return (
      <Card className="surface-panel border-white/70">
        <CardHeader className="items-center pb-2 text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-700 ring-1 ring-teal-200">
            ✓
          </div>
          <CardTitle className="font-display text-3xl text-primary">
            {successMessage}
          </CardTitle>
          <CardDescription className="text-base">
            Loading your page now. Please wait while we prepare your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="mx-auto max-w-md">
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Redirecting to home...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
      <Card className="surface-panel border-white/70">
        <CardHeader>
          <CardTitle className="font-display text-3xl text-primary">{content.header}</CardTitle>
          <CardDescription>{content.subheader}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="py-6 w-full">
            {successMessage && (
                <div className="mb-4 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm text-teal-700">
                  {successMessage}
                </div>
            )}
            {error && (
                <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {error}
                </div>
            )}
            {mode === 'register' && (
                <div className="flex mb-8 justify-between">
                  <div className="pr-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                        required
                        placeholder="Full Name"
                        id="full-name"
                        value={formState.name}
                        onChange={(e) =>
                            setFormState((s) => ({...s, name: e.target.value}))
                        }
                    />
                  </div>

                  <div className="mb-8">
                    <Label htmlFor="tel">Phone number</Label>
                    <Input
                        required
                        type="tel"
                        id="tel"
                        placeholder="Phone"
                        value={formState.phone_number}
                        onChange={(e) =>
                            setFormState((s) => ({...s, phone_number: e.target.value}))
                        }
                    />
                  </div>

                </div>

            )}
            <div className="mb-8">
              <Label htmlFor="email">Email</Label>
              <Input
                  required
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formState.email}
                  onChange={(e) =>
                      setFormState((s) => ({...s, email: e.target.value}))
                  }
              />
            </div>
            <div className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                  required
                  value={formState.password}
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) =>
                      setFormState((s) => ({...s, password: e.target.value}))
                  }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
              <span>
                <Link
                    href={content.linkUrl}
                    className="font-bold text-primary"
                >
                  {content.linkText}
                </Link>
              </span>
              </div>
              <div>
                <Button type="submit" variant="secondary" disabled={isSubmitting}>
                  {isSubmitting ? 'Please wait...' : content.buttonText}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>);
}
