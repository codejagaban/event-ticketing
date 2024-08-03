"use client";
import AuthForm from "@/components/auth-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

interface Data {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}
const AuthSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    organization_name: z.string().optional(),
    organization_phone: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (data: Data) => {
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

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
    if (response.status === 201) {
      router.push("/");
      router.refresh();
    } else {
      response.status === 409
        ? setError("User account already exists")
        : null;
    }
  };

  return (
    <>
      <AuthForm
        authError={error}
        errors={errors}
        title="Create an account"
        onSubmit={handleFormSubmit}
        buttonText="Register"
        linkDescription="Already have an account?"
        linkText="Login"
        linkHref="/login"
      />
    </>
  );
}
