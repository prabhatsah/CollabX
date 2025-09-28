'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { invitationSignup } from '@/lib/api/auth';
import Link from 'next/link';

export function InvitationSignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [token, setToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      'fullName:',
      fullName,
      ', token: ',
      token,
      ', password: ',
      password,
    );

    if (!fullName || !password || !token) {
      toast.error('Missing fields', {
        description: 'Please enter all the fields.',
      });
      return;
    }

    try {
      const res = await invitationSignup(token, fullName, password);
      toast.success('User created.', {
        description: 'Redirecting to your login page...',
      });
      router.push('/login');
    } catch (err: any) {
      toast.error('Signup failed.', {
        description: err.message,
      });
      setError(err.message);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signup</CardTitle>
          <CardDescription>
            Fill up your details to join the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="text">Token</Label>
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    id="token"
                    type="text"
                    placeholder="Token"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="text">Your Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">
                    I agree to{' '}
                    <a href="#" className="underline underline-offset-4">
                      Term & Conditions
                    </a>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
