
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function HomePage() {
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
            <div className="mx-auto w-full max-w-7xl space-y-10">
                <header className="border-b border-[#E5E2D8] pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            to="/user"
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
                                    YOUR PERSONAL COOKBOOK
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
                    </div>
                </header>

                <section className="relative overflow-hidden rounded-2xl bg-[#E9EDE4] px-6 py-10 sm:px-10 sm:py-14">
                    <div className="relative z-10 max-w-2xl">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                            A LITTLE INSPIRATION FOR TODAY
                        </p>

                        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#34483A] sm:text-5xl">
                            Good food.
                            <br />
                            Favorite memories.
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-[#626C60] sm:text-base">
                            Keep the recipes you love close at hand, and find inspiration
                            for whatever comes next in your kitchen.
                        </p>
                    </div>

                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-[#D4DDCE] sm:h-64 sm:w-64"
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 right-20 h-40 w-40 rounded-full border border-[#D4DDCE]"
                    />
                </section>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-[#F8E9E3] px-4 py-3 text-sm text-[#8A4938]"
                    >
                        {error}
                    </p>
                )}

                <RecipeCollection />
            </div>
        </Section>
    );
}
