import { redirect } from "next/navigation";
import RegistrationForm from "./form";

export default async function RegisterPage() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}
