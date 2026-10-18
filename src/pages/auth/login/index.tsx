
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
    return (
        <Card className="rounded-2xl border border-[#E7E4DA] bg-white p-6 shadow-[0_8px_30px_rgba(52,72,58,0.06)] sm:p-8 [&_input]:rounded-lg [&_input]:border-[#DCE2D8] [&_input]:bg-[#FAF9F5] [&_input]:py-3 [&_input]:text-[#34483A] [&_input]:outline-none [&_input]:transition-colors [&_input]:focus:border-[#718575] [&_input]:focus:ring-2 [&_input]:focus:ring-[#718575]/15">
            <AuthFormHeader
                title="Welcome back"
                description="Sign in to find your next favorite meal."
            />

            <LoginForm />

            <p className="mt-6 text-center text-sm text-[#747A71]">
                New here?{" "}
                <Link
                    className="font-medium text-[#34483A] underline decoration-[#AAB6A5] underline-offset-4 transition-colors hover:text-[#718575]"
                    to="/auth/signup"
                >
                    Create an account
                </Link>
            </p>
        </Card>
    );
}
