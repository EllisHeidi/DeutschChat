import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Registrieren",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
