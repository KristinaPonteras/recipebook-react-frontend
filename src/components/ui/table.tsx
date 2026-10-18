
import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({
    className,
    ...props
}: TableHTMLAttributes<HTMLTableElement>) {
    return (
        <div className="overflow-x-auto rounded-xl border border-[#E5E2D8] bg-white">
            <table
                className={cn(
                    "w-full text-left text-sm text-[#34483A] [&_th]:bg-[#EDF0E8] [&_th]:px-5 [&_th]:py-4 [&_th]:font-semibold [&_th]:text-[#34483A] [&_td]:px-5 [&_td]:py-4 [&_tbody_tr]:border-t [&_tbody_tr]:border-[#EAE8E0] [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[#FAF9F5]",
                    className,
                )}
                {...props}
            />
        </div>
    );
}
