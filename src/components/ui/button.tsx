
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "tertiary";
    children: ReactNode;
};

const variants = {
    primary:
        "bg-[#34483A] text-[#F7F4EC] hover:bg-[#26382C] shadow-sm",
    secondary:
        "border border-[#DCE2D8] bg-[#EDF0E8] text-[#34483A] hover:bg-[#E2E8DD]",
    tertiary:
        "bg-transparent text-[#59665B] hover:bg-[#EDF0E8] hover:text-[#34483A]",
};

export function Button({
    variant = "primary",
    className,
    children,
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#718575] disabled:cursor-not-allowed disabled:opacity-60",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
