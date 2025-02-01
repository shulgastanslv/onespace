'use client';

import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, Eye, EyeClosed } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { findByEmail } from '@/services/user';
export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchUrl = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await findByEmail(email);

      if (!user) {
        setError('User with this email not found');
        return;
      }

      const result = await signIn('credentials', {
        ...user,
        redirect: false,
        callbackUrl: searchUrl.get('callbackUrl') || '/',
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      if (result?.ok) {
        router.push(result.url || '/');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="max-w-md w-full  bg-background dark:bg-background/40 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl">
      <CardHeader className="flex flex-col items-center gap-3 pt-8 pb-4">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-sm text-default-500 dark:text-default-400">
          Sign in to continue
        </p>
      </CardHeader>
      <CardBody className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="bordered"
            radius="lg"
            classNames={{
              label: 'text-default-600 dark:text-default-400',
              input: 'text-sm',
            }}
          />
          <Input
            label="Password"
            type={isVisible ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="bordered"
            radius="lg"
            endContent={
              <Button
                className="focus:outline-none border-none"
                type="button"
                variant="light"
                isIconOnly
                size="sm"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="w-4 h-4 text-default-400" />
                ) : (
                  <EyeClosed className="w-4 h-4 text-default-400" />
                )}
              </Button>
            }
            classNames={{
              label: 'text-default-600 dark:text-default-400',
              input: 'text-sm',
            }}
          />
          {error && (
            <div className="p-3 text-sm text-center bg-danger-50 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-danger" />
              {error}
            </div>
          )}
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            fullWidth
            className="font-semibold shadow-lg hover:shadow-primary/25 transition-shadow"
            size="lg"
            radius="lg"
            isLoading={isLoading}
          >
            Sign in
          </Button>

          <Divider className="my-4" />

          <p className="text-center text-sm text-default-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </CardBody>
    </Card>
  );
}
