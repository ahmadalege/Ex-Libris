"use client";

import React, { useState } from "react";
import { Eye, EyeOff, BookOpen, User, Mail, Lock, Feather } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookLoading from "@/components/Clientloading";
import { registerSchema } from "@/lib/validations/userSchema";
import Image from "next/image";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = registerSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMessages = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errorMessages).flat()[0];
      toast.error(firstError || "Validation failed");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setIsLoading(false);
        toast.success("Registration successful! You can now log in.", {});
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      } else {
        toast.error(data.error || "Registration failed. Please try again.", {});
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
      console.error("Registration fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
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

      <div className="relative w-full max-w-md">
        {/* Ornate Border Frame */}
        <div
          className="absolute -inset-4 border-2 border-amber-200/40 rounded-lg"
          style={{
            backgroundImage: `
                 linear-gradient(45deg, transparent 40%, rgba(217, 119, 6, 0.05) 50%, transparent 60%),
                 linear-gradient(-45deg, transparent 40%, rgba(217, 119, 6, 0.05) 50%, transparent 60%)
               `,
          }}
        ></div>

        {/* Main Registration Card */}
        <div className="relative bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] rounded-lg shadow-2xl border border-amber-200/60 p-8">
          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 opacity-20">
            <BookOpen className="w-full h-full text-amber-700" />
          </div>
          <div className="absolute top-4 right-4 w-6 h-6 opacity-20">
            <Feather className="w-full h-full text-amber-700" />
          </div>

          {/* Logo Section */}
          <div className="text-center mb-8">
            <div>
              <Image
                className="mb-2"
                src="/logo2.png"
                alt="Ex Libris Logo"
                width={500}
                height={500}
              />
            </div>
            <h1
              className="text-4xl font-serif text-amber-800 mb-2"
              style={{ fontFamily: "'Crimson Text', 'Times New Roman', serif" }}
            >
              Ex Libris
            </h1>
            <div className="flex items-center justify-center space-x-2 opacity-60 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-2 h-px bg-amber-600"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-2 h-px bg-amber-600"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="text-amber-700 font-serif text-sm tracking-wide">
              Begin Your Literary Journey
            </p>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="relative">
              <label className="block text-sm font-serif text-amber-800 mb-2">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600 opacity-60" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
                  placeholder="yourusername1"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-serif text-amber-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600 opacity-60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-serif text-amber-800 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600 opacity-60" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
                  placeholder="*********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60 hover:opacity-80 transition-opacity"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-sm font-serif text-amber-800 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600 opacity-60" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60"
                  placeholder="*********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60 hover:opacity-80 transition-opacity"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-amber-600 bg-[#fdf6e3] border-amber-300 rounded focus:ring-amber-400 focus:ring-2"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm font-serif text-amber-800 leading-relaxed"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-700 underline decoration-amber-400/50 hover:decoration-amber-600 transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-700 underline decoration-amber-400/50 hover:decoration-amber-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-amber-400 disabled:to-amber-500 text-white font-serif py-3 px-6 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <BookLoading loadingText="Creating Account" />
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>Join the Library</span>
                </>
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 opacity-40 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="text-sm font-serif text-amber-700">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-800 underline decoration-amber-400/50 hover:decoration-amber-600 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Decorative Bottom Element */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-20">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
