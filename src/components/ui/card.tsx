
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
    children: ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-xl border border-[#E5E2D8] bg-white",
                className,
            )}
        >
            {children}
        </div>
    );
}
