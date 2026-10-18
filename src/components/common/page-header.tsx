
import type { ReactNode } from "react";

type PageHeaderProps = {
    eyebrow: string;
    title: string;
    description: string;
    children?: ReactNode;
};

// Shared page heading. Optional children provide actions such as Sign out.
export function PageHeader({
    eyebrow,
    title,
    description,
    children,
}: PageHeaderProps) {
    return (
        <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#E5E2D8] pb-6">
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                    {eyebrow}
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#34483A] sm:text-4xl">
                    {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#747A71] sm:text-base">
                    {description}
                </p>
            </div>

            {children && (
                <div className="flex shrink-0 items-center gap-3">
                    {children}
                </div>
            )}
        </header>
    );
}
