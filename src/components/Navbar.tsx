"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = useCallback((href: string) => pathname === href, [pathname]);
  return (
    <nav className="bg-[#5b2c31] shadow-sm border-b border-[#d8cfc4] sticky top-0 z-50">
      <div className="mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="relative w-[100px] h-[40px]">
          <Image
            src="/logo.png"
            alt="Ex Libris Logo"
            layout="fill"
            objectFit="contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center space-x-5 lg:mr-5">
          <Link href="/register" className="text-[#fdf6e3]">
            Register
          </Link>
          <Link href="/login" className="text-[#fdf6e3]">
            Login
          </Link>

          <button
            className="px-4 py-2 text-sm text-[#fdf6e3]  bg- font-medium  hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Logout from your account"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
