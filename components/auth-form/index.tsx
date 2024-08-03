import Link from "next/link";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface Data {
  first_name?: string;
  last_name?: string;
  organization_name?: string;
  organization_phone?: string;
  email: string;
  password: string;
  confirm_password?: string;
}


interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: Data) => void;
  linkText: string;
  linkDescription: string;
  linkHref: string;
  isFullForm?: boolean;
  authError: string;
  errors?: Record<string, string>;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  linkText,
  linkHref,
  linkDescription,
  isFullForm = true,
  authError = "",
  errors = {},
}: AuthFormProps) {
  const [formData, setFormData] = useState<Data>({
    first_name: "",
    last_name: "",
    email: "",
    organization_name: "",
    organization_phone: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // setErrors({
    //   ...errors,
    //   [e.target.name]: "",
    // });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <form onSubmit={handleFormSubmit}>
        <Card className="md:w-[600px] py-5 md:px-10 px-5">
          <CardHeader>
            <CardTitle className="text-3xl text-center">{title}</CardTitle>
          </CardHeader>
          {isFullForm && (
            <>
                <p className="text-red-500 text-sm text-center mb-2">
                      {authError}
                    </p>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-2">
                <div className="mb-2 md:mb-0">
                  <label htmlFor="first_name" className="text-sm">
                    First Name <span className="text-red-600"> *</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                  {errors.first_name && (
                    <span className="text-red-500 text-[13px]">
                      {errors.first_name}
                    </span>
                  )}
                </div>
                <div className="mb-2 md:mb-0">
                  <label htmlFor="last_name" className="text-sm">
                    Last Name<span className="text-red-600"> *</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-[13px]">
                      {errors.last_name}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 md:mb-2">
                <div className="mb-2 md:mb-0">
                  <label htmlFor="organization_name" className="text-sm">
                    Organization Name:
                  </label>
                  <Input
                    type="text"
                    placeholder="Organization Name"
                    name="organization_name"
                    value={formData.organization_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2 md:mb-0">
                  <label htmlFor="organization_phone" className="text-sm">
                    Organization Phone:
                  </label>
                  <Input
                    type="tel"
                    placeholder="Organization Phone"
                    name="organization_phone"
                    value={formData.organization_phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}
          <div className="mb-2">
            <label htmlFor="email" className="text-sm">
              Email<span className="text-red-600"> *</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="text-red-500 text-[13px]">{errors.email}</span>
            )}
          </div>
          <div className="mb-2 relative">
            <label htmlFor="password" className="text-sm">
              Password<span className="text-red-600"> *</span>
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
           {isFullForm && <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform translate-y-1/3"
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>}
            {errors.password && (
              <span className="text-red-500 text-[13px]">
                {errors.password}
              </span>
            )}
          </div>
          {isFullForm && (
            <div className="mb-2 relative">
              <label htmlFor="confirm_password" className="text-sm">
                Confirm Password<span className="text-red-600"> *</span>
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your Password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-[13px]">
                  {errors.confirm_password}
                </span>
              )}
            </div>
          )}
          <div className="text-center mt-6">
            <Button className="w-full" size="lg" type="submit">
              {buttonText}
            </Button>
            <p className="text-sm mt-5">
              {linkDescription}{" "}
              <Link href={linkHref} className="underline">
                {linkText}
              </Link>
            </p>
            {!isFullForm && (
              <p className="text-sm mt-5">
                <Link href="/forgot-password" className="underline">
                  Forgot Password?
                </Link>
              </p>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
