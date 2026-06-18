"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CONTACT_EMAIL, CONTACT_FORM_URL } from "@/lib/data/business";

interface ContactModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return ctx;
}

export default function ContactModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="お問い合わせフォーム"
            className="relative flex w-full max-w-2xl flex-col rounded-xl bg-white shadow-2xl"
            style={{ height: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-medium text-gray-900">
                お問い合わせ・ご相談
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="閉じる"
                className="-mr-1 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden bg-white">
              <iframe
                src={CONTACT_FORM_URL}
                title="お問い合わせフォーム"
                className="h-full w-full"
                style={{ border: 0 }}
              >
                読み込んでいます…
              </iframe>
            </div>

            <div className="border-t border-gray-100 px-5 py-3 text-center">
              <p className="text-xs text-gray-400">
                フォームが開けない場合は{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-brand underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                まで
              </p>
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
