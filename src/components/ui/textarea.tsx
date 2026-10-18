
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
    return (
        <div className="w-full">
            <textarea
                className={cn(
                    "w-full rounded-lg border bg-[#FAF9F5] px-4 py-3 text-sm leading-6 text-[#34483A] placeholder:text-[#9A9D93] outline-none transition-colors duration-200 focus:border-[#718575] focus:ring-2 focus:ring-[#718575]/15 disabled:cursor-not-allowed disabled:opacity-60",
                    error
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-[#DCE2D8]",
                    className,
                )}
                aria-invalid={Boolean(error)}
                {...props}
            />

            {error && (
                <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
