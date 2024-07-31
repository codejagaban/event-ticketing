import Link from "next/link";
import { FormEvent, useState } from "react";

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
        className=" max-w-[600px] w-full bg-white p-8 rounded shadow-md"
      >
        <h1 className=" text-center text-2xl font-semibold">{title}</h1>
        {isFullForm && (
          <>
            <div className="">
              <label htmlFor="first_name" className="text-sm">
                First Name:
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Organization Name"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Organization Phone"
              name="organization_phone"
              value={formData.organization_phone}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={formData.password}
          required
          onChange={handleInputChange}
        />
        <button>{buttonText}</button>
        <p>
          {linkDescription}
          <Link href={linkHref}>{linkText}</Link>
        </p>
      </form>
    </div>
  );
}
