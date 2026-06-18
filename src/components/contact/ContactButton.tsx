"use client";

import { type ReactNode } from "react";
import { useContactModal } from "./ContactModalProvider";

type ContactButtonVariant = "solid" | "outline" | "link";

const variantClasses: Record<ContactButtonVariant, string> = {
  solid:
    "inline-block px-7 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity",
  outline:
    "px-5 py-2.5 text-sm font-medium text-brand border border-brand rounded-md hover:bg-brand hover:text-white transition-colors whitespace-nowrap",
  link: "text-sm text-gray-500 hover:text-gray-900 transition-colors text-left",
};

export default function ContactButton({
  children,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  variant?: ContactButtonVariant;
  className?: string;
}) {
  const { open } = useContactModal();
  return (
    <button
      type="button"
      onClick={open}
      className={className ?? variantClasses[variant]}
    >
      {children}
    </button>
  );
}
