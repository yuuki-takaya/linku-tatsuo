"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.25em] text-gray-900 hover:opacity-70 transition-opacity"
        >
          LINK U
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
          >
            インタビュー
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
          >
            人物
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors tracking-wide"
          >
            タグ
          </Link>
          <Link
            href="/business"
            className="text-sm font-medium text-brand hover:opacity-70 transition-opacity tracking-wide"
          >
            企業の方へ
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <span
            className={`block w-5 h-px bg-gray-900 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-gray-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-gray-900 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm text-gray-700 tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            インタビュー
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-700 tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            人物
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-700 tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            タグ
          </Link>
          <Link
            href="/business"
            className="text-sm font-medium text-brand tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            企業の方へ
          </Link>
        </div>
      )}
    </header>
  );
}
