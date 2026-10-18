
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { AdminRecipes } from "@/components/features/admin/admin-recipes";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    const { user, logout } = useAuth();
    const [error, setError] = useState("");

    async function handleLogout() {
        try {
            setError("");
            await logout();
        } catch {
            setError("Unable to sign out. Please try again.");
        }
    }

    return (
        <Section>
            <div className="mx-auto w-full max-w-7xl space-y-9">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E2D8] pb-5">
                    <Link
                        to="/admin"
                        className="flex items-center gap-3 text-[#34483A] no-underline"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#34483A] text-xl text-[#F7F4EC]">
                            ♧
                        </span>
                        <span>
                            <span className="block text-lg font-semibold tracking-tight">
                                Recipe Book
                            </span>
                            <span className="block text-xs tracking-wide text-[#718575]">
                                ADMIN WORKSPACE
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-[#59665B] sm:inline">
                            {user?.name}
                        </span>
                        <Button
                            variant="secondary"
                            onClick={handleLogout}
                            className="rounded-full border border-[#D9DED4] bg-transparent text-[#34483A] hover:bg-[#EAEDE5]"
                        >
                            Sign out
                        </Button>
                    </div>
                </header>

                <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                            RECIPE COLLECTION
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-[#34483A] sm:text-4xl">
                            All recipes
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#747A71] sm:text-base">
                            Browse and manage recipes from across every account.
                        </p>
                    </div>

                    <div className="hidden border-l-2 border-[#D7C39A] pl-4 sm:block">
                        <p className="text-sm font-medium text-[#34483A]">
                            The recipe library
                        </p>
                        <p className="mt-1 text-xs text-[#747A71]">
                            One place to keep everything organized.
                        </p>
                    </div>
                </section>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-[#F8E9E3] px-4 py-3 text-sm text-[#8A4938]"
                    >
                        {error}
                    </p>
                )}

                <AdminRecipes />
            </div>
        </Section>
    );
}
