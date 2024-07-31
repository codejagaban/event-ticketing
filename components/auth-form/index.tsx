import Link from "next/link";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface Data {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: Data) => void;
  linkText: string;
  linkDescription: string;
  linkHref: string;
  isFullForm?: boolean;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  isFullForm = true,
}: AuthFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    organization_name: "",
    organization_phone: "",
    password: "",
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <form
        onSubmit={handleFormSubmit}
      >
        <Card className="md:w-[600px] py-5 md:px-10 px-5">
        <CardHeader>
            <CardTitle className="text-3xl text-center">{title}</CardTitle>
        </CardHeader>
        {isFullForm && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-2">
            <div className="mb-2 md:mb-0 ">
                <label htmlFor="first_name" className="text-sm">
                  First Name:
                </label>
                <Input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2 md:mb-0 ">
                <label htmlFor="last_name" className="text-sm">
                  Last Name:
                </label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  md:gap-10 md:mb-2">
              <div className="mb-2 md:mb-0 ">
                <label htmlFor="organization_name" className="text-sm">
                  Organization Name:
                </label>
                <Input
                  type="text"
                  placeholder="Organization Name"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2 md:mb-0 ">
                <label htmlFor="organization_phone" className="text-sm">
                  Organization Phone:
                </label>
                <Input
                  type="tel"
                  placeholder="Organization Phone"
                  name="organization_phone"
                  value={formData.organization_phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </>
        )}
        <div className="mb-2">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <Input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="text-sm">
            Password:
          </label>
          <Input
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={formData.password}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center mt-6">
        <Button className="w-full" size="lg">{buttonText}</Button>
        <p className="text-sm mt-5">
          {linkDescription} {" "}
          <Link href={linkHref} className=" underline">{linkText}</Link>
            </p>
            {
              !isFullForm && (
                <p className="text-sm mt-5">
                  <Link href="/forgot-password" className="underline">
                    Forgot Password?
                  </Link>
                </p>
              )
           }
          </div>
          </Card>
      </form>
    </div>
  );
}
