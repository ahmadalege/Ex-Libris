"use client";

import React from "react";
import {
  BookOpen,
  ShieldOff,
  Feather,
  ArrowLeft,
  Home,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Ornate Border Frame */}
        <div
          className="absolute -inset-4 border-2 border-red-200/40 rounded-lg"
          style={{
            backgroundImage: `
                 linear-gradient(45deg, transparent 40%, rgba(239, 68, 68, 0.05) 50%, transparent 60%),
                 linear-gradient(-45deg, transparent 40%, rgba(239, 68, 68, 0.05) 50%, transparent 60%)
               `,
          }}
        ></div>

        {/* Main Unauthorized Card */}
        <div className="relative bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] rounded-lg shadow-2xl border border-red-200/60 p-8">
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 opacity-20">
            <BookOpen className="w-full h-full text-red-700" />
          </div>
          <div className="absolute top-4 right-4 w-6 h-6 opacity-20">
            <Feather className="w-full h-full text-red-700" />
          </div>

          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <Image
                className="mb-2 grayscale opacity-75"
                src="/logo2.png"
                alt="Ex Libris Logo"
                width={400}
                height={400}
              />
            </div>
            <h1
              className="text-4xl font-serif text-red-800 mb-2"
              style={{ fontFamily: "'Crimson Text', 'Times New Roman', serif" }}
            >
              Access Denied
            </h1>
            <div className="flex items-center justify-center space-x-2 opacity-60 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-600"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              <div className="w-2 h-px bg-red-600"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              <div className="w-2 h-px bg-red-600"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-600"></div>
            </div>
          </div>

          {/* Central Icon and Message */}
          <div className="text-center mb-8">
            {/* Large Lock/Shield Icon */}
            <div className="relative mx-auto mb-6 w-24 h-24 flex items-center justify-center">
              {/* Ornate Border Frame for Icon */}
              <div
                className="absolute inset-0 border-2 border-red-300/40 rounded-full"
                style={{
                  backgroundImage: `
                     radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 70% 70%, rgba(185, 28, 28, 0.06) 0%, transparent 50%)
                   `,
                }}
              ></div>

              <div className="relative bg-gradient-to-br from-red-100 to-red-50 rounded-full p-5 shadow-lg border border-red-200/60">
                <ShieldOff className="w-12 h-12 text-red-600 opacity-80" />
              </div>
            </div>

            {/* Error Message */}
            <h2
              className="text-2xl font-serif text-red-800 mb-4"
              style={{ fontFamily: "'Crimson Text', 'Times New Roman', serif" }}
            >
              Restricted Section
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-amber-700 font-serif text-lg leading-relaxed">
                You do not have permission to access this sacred archive.
              </p>
              <p className="text-amber-600 font-serif text-sm leading-relaxed opacity-75">
                This section of the library requires special privileges. Please
                contact the librarian if you believe you should have access to
                these ancient texts.
              </p>
            </div>

            {/* Decorative Quote */}
            <div className="relative p-6 mb-8">
              <div className="absolute top-2 left-2 text-4xl text-red-300/40 font-serif">
                "
              </div>
              <p className="text-amber-700 font-serif text-sm italic leading-relaxed pt-4">
                Not all knowledge is meant for every seeker. Some wisdom must be
                earned through proper channels and demonstrated responsibility.
              </p>
              <div className="absolute bottom-2 right-2 text-4xl text-red-300/40 font-serif rotate-180">
                "
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => router.back()}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-serif py-3 px-6 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Previous Page</span>
            </button>

            <Link
              href="/dashboard"
              className="w-full bg-white border border-amber-300/60 hover:border-amber-400 text-amber-800 font-serif py-3 px-6 rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Return to Library</span>
            </Link>

            <Link
              href="/"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-serif py-3 px-6 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="text-center border-t border-red-200/40 pt-6">
            <div className="flex items-center justify-center space-x-2 opacity-40 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-600"></div>
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-600"></div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-serif text-amber-700 opacity-75">
                Error Code: 403 - Forbidden Access
              </p>
              <p className="text-xs font-serif text-amber-600 opacity-60">
                If you believe this is an error, please contact the
                administrator
              </p>
            </div>
          </div>

          {/* Decorative Bottom Element */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-20">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute bottom-4 left-4 w-6 h-6 opacity-15">
            <Lock className="w-full h-full text-red-700" />
          </div>
          <div className="absolute bottom-4 right-4 w-6 h-6 opacity-15">
            <ShieldOff className="w-full h-full text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
