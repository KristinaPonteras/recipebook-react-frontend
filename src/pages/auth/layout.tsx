
import { AuthHeader } from "@/components/features/auth/auth-header";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";

export default function AuthLayout() {
    const { user, ready } = useAuth();

    if (ready && user) {
        return (
            <Navigate
                to={user.role === "ADMIN" ? "/admin" : "/user"}
                replace
            />
        );
    }

    return (
        <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#F7F4EC] px-5 py-12">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#DDE3D7]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-[#DDE3D7]"
            />

            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-2xl border border-[#E7E4DA] bg-white p-6 shadow-[0_12px_40px_rgba(52,72,58,0.06)] sm:p-9">
                    <AuthHeader />
                    {ready && <Outlet />}
                </div>

                <p className="mt-6 text-center text-xs tracking-wide text-[#718575]">
                    A little space for the recipes you love.
                </p>
            </div>
        </main>
    );
}
