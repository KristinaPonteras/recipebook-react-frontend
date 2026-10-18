
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-stretch justify-center bg-[#34483A]/50 backdrop-blur-sm lg:items-center lg:p-4"
            onClick={onClose}
        >
            <div
                className="flex h-full w-full flex-col bg-[#F7F4EC] text-[#34483A] lg:h-auto lg:max-h-[90vh] lg:max-w-2xl lg:rounded-2xl lg:border lg:border-[#E5E2D8] lg:bg-white lg:shadow-[0_20px_60px_rgba(52,72,58,0.16)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#EAE8E0] px-5 py-4 sm:px-6">
                    <h2 className="text-lg font-semibold tracking-tight text-[#34483A]">
                        {title}
                    </h2>

                    <Button
                        variant="tertiary"
                        onClick={onClose}
                        className="shrink-0 rounded-full text-[#59665B] hover:bg-[#EDF0E8] hover:text-[#34483A]"
                    >
                        Close
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
