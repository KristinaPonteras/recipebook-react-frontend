
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
    children: ReactNode;
    className?: string;
};

export function Tag({ children, className }: TagProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-[#DCE2D8] bg-[#EDF0E8] px-3 py-1 text-xs font-medium tracking-wide text-[#34483A]",
                className,
            )}
        >
            {children}
        </span>
    );
}
