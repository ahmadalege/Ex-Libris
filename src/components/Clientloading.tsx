"use client";
import React from "react";

interface BookLoadingProps {
  loadingText?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const BookLoading: React.FC<BookLoadingProps> = ({
  loadingText = "Turning ancient pages...",
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-12 h-16 sm:w-16 sm:h-20",
    medium: "w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32",
    large: "w-20 h-28 sm:w-24 sm:h-32 md:w-32 md:h-40",
  };

  const textSizeClasses = {
    small: "text-xs sm:text-sm",
    medium: "text-sm sm:text-base",
    large: "text-base sm:text-lg",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px] px-4 ${className}`}
    >
      {/* Ornate Border Frame */}
      <div className="relative mb-6 sm:mb-8 p-4 sm:p-6 md:p-8">
        {/* Decorative Corner Flourishes */}
        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 opacity-30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-amber-800"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.18 0 2.34-.21 3.41-.6.24-.09.39-.32.39-.58 0-.34-.28-.62-.62-.62-.06 0-.12.01-.18.03C14.08 20.65 13.06 20.88 12 20.88c-4.93 0-8.88-4.02-8.88-8.88S7.07 3.12 12 3.12s8.88 4.02 8.88 8.88c0 1.06-.23 2.08-.65 3-.02.06-.03.12-.03.18 0 .34.28.62.62.62.26 0 .49-.15.58-.39C21.79 14.34 22 13.18 22 12c0-5.52-4.48-10-10-10z"
              fill="currentColor"
            />
            <path
              d="M8 8h8M8 12h8M8 16h6"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 opacity-30 transform rotate-90">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-amber-800"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.18 0 2.34-.21 3.41-.6.24-.09.39-.32.39-.58 0-.34-.28-.62-.62-.62-.06 0-.12.01-.18.03C14.08 20.65 13.06 20.88 12 20.88c-4.93 0-8.88-4.02-8.88-8.88S7.07 3.12 12 3.12s8.88 4.02 8.88 8.88c0 1.06-.23 2.08-.65 3-.02.06-.03.12-.03.18 0 .34.28.62.62.62.26 0 .49-.15.58-.39C21.79 14.34 22 13.18 22 12c0-5.52-4.48-10-10-10z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 opacity-30 transform rotate-270">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-amber-800"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.18 0 2.34-.21 3.41-.6.24-.09.39-.32.39-.58 0-.34-.28-.62-.62-.62-.06 0-.12.01-.18.03C14.08 20.65 13.06 20.88 12 20.88c-4.93 0-8.88-4.02-8.88-8.88S7.07 3.12 12 3.12s8.88 4.02 8.88 8.88c0 1.06-.23 2.08-.65 3-.02.06-.03.12-.03.18 0 .34.28.62.62.62.26 0 .49-.15.58-.39C21.79 14.34 22 13.18 22 12c0-5.52-4.48-10-10-10z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 opacity-30 transform rotate-180">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-amber-800"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.18 0 2.34-.21 3.41-.6.24-.09.39-.32.39-.58 0-.34-.28-.62-.62-.62-.06 0-.12.01-.18.03C14.08 20.65 13.06 20.88 12 20.88c-4.93 0-8.88-4.02-8.88-8.88S7.07 3.12 12 3.12s8.88 4.02 8.88 8.88c0 1.06-.23 2.08-.65 3-.02.06-.03.12-.03.18 0 .34.28.62.62.62.26 0 .49-.15.58-.39C21.79 14.34 22 13.18 22 12c0-5.52-4.48-10-10-10z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Ancient Parchment Scroll/Codex */}
        <div className="relative flex justify-center">
          <div
            className={`${sizeClasses[size]} relative transform rotate-0 transition-transform duration-700 hover:rotate-1`}
          >
            {/* Main Parchment Body */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] shadow-2xl border border-amber-200/60"
              style={{
                borderRadius: "2px",
                backgroundImage: `
                     radial-gradient(circle at 20% 30%, rgba(180, 83, 9, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 80% 70%, rgba(146, 64, 14, 0.06) 0%, transparent 50%),
                     radial-gradient(circle at 60% 20%, rgba(217, 119, 6, 0.04) 0%, transparent 40%)
                   `,
              }}
            >
              {/* Subtle Paper Fiber Texture */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23d97706'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "30px 30px",
                }}
              ></div>

              {/* Left Binding Edge */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-400/60 via-amber-500/40 to-amber-600/60 shadow-inner"></div>

              {/* Ancient Script Lines */}
              <div className="absolute inset-3 space-y-1">
                <div className="h-px bg-gradient-to-r from-amber-400/30 via-amber-500/20 to-transparent"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/15 to-amber-400/25 ml-2"></div>
                <div className="h-px bg-gradient-to-r from-amber-400/20 via-amber-500/25 to-transparent ml-1"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-amber-400/30 ml-3"></div>

                {/* Central Ancient Symbol */}
                <div className="flex justify-center pt-2 pb-2">
                  <div className="w-4 h-4 relative">
                    <div
                      className="absolute inset-0 border border-amber-500/30 transform rotate-45 animate-pulse"
                      style={{ animationDuration: "4s" }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-amber-600/50 rounded-full"></div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-amber-400/25 ml-2"></div>
                <div className="h-px bg-gradient-to-r from-amber-400/25 via-amber-500/15 to-transparent ml-1"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-amber-400/30"></div>
              </div>

              {/* Aged Paper Stains */}
              <div className="absolute top-1 right-2 w-2 h-2 bg-amber-600/10 rounded-full blur-sm"></div>
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-amber-700/15 rounded-full blur-sm"></div>

              {/* Gentle Page Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/40 to-transparent opacity-50 animate-sweep"></div>
            </div>

            {/* Floating Ancient Fragments */}
            <div className="absolute -top-4 -right-3 animate-float">
              <div
                className="w-6 h-7 bg-gradient-to-br from-[#fdf6e3] to-[#f5e6c8] shadow-lg transform rotate-15 border border-amber-200/40"
                style={{ borderRadius: "1px" }}
              >
                <div className="absolute top-1 left-1 right-1 h-px bg-amber-400/25"></div>
                <div className="absolute top-2 left-1 right-2 h-px bg-amber-400/20"></div>
                <div className="absolute top-3 left-1 right-1 h-px bg-amber-400/15"></div>
              </div>
            </div>

            <div className="absolute -top-2 -left-2 animate-float-delayed">
              <div
                className="w-4 h-6 bg-gradient-to-br from-[#faf0da] to-[#f5e6c8] shadow-md transform -rotate-12 border border-amber-200/40"
                style={{ borderRadius: "1px" }}
              >
                <div className="absolute top-1 left-1 right-1 h-px bg-amber-400/30"></div>
                <div className="absolute top-2 left-1 right-1 h-px bg-amber-400/25"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Loading Text */}
      <div className="text-center space-y-3">
        <p
          className={`${textSizeClasses[size]} font-serif text-amber-800 tracking-wide animate-fade`}
          style={{ fontFamily: "'Crimson Text', 'Times New Roman', serif" }}
        >
          {loadingText}
        </p>

        {/* Ornate Divider */}
        <div className="flex items-center justify-center space-x-2 opacity-60">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
          <div className="w-1 h-1 bg-amber-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-px bg-amber-600"></div>
          <div
            className="w-1 h-1 bg-amber-600 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="w-2 h-px bg-amber-600"></div>
          <div
            className="w-1 h-1 bg-amber-600 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
        </div>

        {/* Subtle Status Text */}
        <p className="text-xs font-serif text-amber-700 opacity-75 tracking-widest uppercase">
          Please Wait
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-12px) rotate(12deg);
            opacity: 1;
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(-8deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-8px) rotate(-8deg);
            opacity: 0.9;
          }
        }

        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 1s;
        }

        .animate-sweep {
          animation: sweep 6s ease-in-out infinite;
        }

        .animate-fade {
          animation: fade 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BookLoading;
