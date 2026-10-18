
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
    return (
        <Card className="rounded-2xl border border-[#E7E4DA] bg-white p-6 shadow-[0_8px_30px_rgba(52,72,58,0.06)] sm:p-8 [&_input]:rounded-lg [&_input]:border-[#DCE2D8] [&_input]:bg-[#FAF9F5] [&_input]:py-3 [&_input]:text-[#34483A] [&_input]:outline-none [&_input]:transition-colors [&_input]:focus:border-[#718575] [&_input]:focus:ring-2 [&_input]:focus:ring-[#718575]/15">
            <AuthFormHeader
                title="Create your account"
                description="A little inspiration for your everyday cooking."
            />

            <SignupForm />

            <p className="mt-6 text-center text-sm text-[#747A71]">
                Already have an account?{" "}
                <Link
                    className="font-medium text-[#34483A] underline decoration-[#AAB6A5] underline-offset-4 transition-colors hover:text-[#718575]"
                    to="/auth/login"
                >
                    Sign in
                </Link>
            </p>
        </Card>
    );
}
