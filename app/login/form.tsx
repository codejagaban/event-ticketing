'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import directus from '@/lib/directus';

import AuthForm from '@/components/auth-form';
import { useState } from 'react';
import { login } from '@directus/sdk';

interface Data {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleFormSubmit = async (data: Data) => {
    const { email, password } = data;
    // const response = await directus.request(
    //   login(email, password)
    // )
    
    // if (!response) {
    //   router.push('/');
    //   router.refresh();
    // } else {
    //   response.status === 401
    //     ? setError('Your email or password is incorrect')
    //     : null;
    // }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm
        title="Login to your accouunt"
        onSubmit={handleFormSubmit}
        buttonText="Login"
        linkDescription="New here?"
        linkText="Create an account"
        linkHref="/register"
        isFullForm={false}
      />
      <div>
       
      </div>
    </>
  );
}