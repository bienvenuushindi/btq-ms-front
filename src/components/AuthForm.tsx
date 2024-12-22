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
import {useCallback, useState} from 'react';
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

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        user: formState
      };
      try {
        if (mode === 'register') {
          await register(data);
        } else {
          await signin(data);
        }
        router.push('/home');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({...initial});
      }
    },
    [
      formState.email,
      formState.password,
      formState.name,
    ]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
      <Card>
        <CardHeader>
          <CardTitle>{content.header}</CardTitle>
          <CardDescription>{content.subheader}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="py-6 w-full">
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
                    className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
              </div>
              <div>
                <Button variant="secondary">{content.buttonText}</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>);
}
