'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import directus from '@/lib/directus';
import { z } from "zod";
import AuthForm from '@/components/auth-form';
import { useState } from 'react';
import { login } from '@directus/sdk';

interface Data {
  email: string;
  password: string;
}

const AuthSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
  })

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleFormSubmit = async (data: Data) => {
    const { email, password } = data;
    const result = AuthSchema.safeParse(data);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          newErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(newErrors);
      return;
    }
    const response = await directus.login(email, password);
    if (!response) {
      router.push('/');
      router.refresh();
    } else {
      console.log(response)
      response.status === 401
        ? setError('Email address or password is incorrect')
        : null;
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm
        authError={error}
        errors={errors}
        title="Login to your accouunt"
        onSubmit={handleFormSubmit}
        buttonText="Login"
        linkDescription="New here?"
        linkText="Create an account"
        linkHref="/register"
        isFullForm={false}
      />
    </>
  );
}