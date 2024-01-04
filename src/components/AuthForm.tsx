'use client';
import {register, signin} from '@/lib/api';
import {useRouter} from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
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
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2 text-black">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  Full Name
                </div>
                <Input
                  required
                  placeholder="Full Name"
                  value={formState.name}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({...s, name: e.target.value}))
                  }
                />
              </div>

              <div className="mb-8">
                <div className="text-lg mb-4 ml-2 text-black/50">Phone number</div>
                <Input
                  required
                  type="tel"
                  placeholder="Phone"
                  value={formState.phone_number}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({...s, phone_number: e.target.value}))
                  }
                 />
              </div>
              
            </div>
            
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({...s, email: e.target.value}))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
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
              <Button intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
