"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Search,
  Heart,
  BookmarkIcon,
  User,
  Settings,
  LogOut,
  Shield,
  Users,
  BarChart3,
  Plus,
  Library,
  Star,
  Menu,
  X,
  Feather,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Navigation links for authenticated users
  const navLinks = [
    { href: "/", label: "Home", icon: Library },
    { href: "/browse", label: "Browse Books", icon: BookOpen },
    { href: "/my-library", label: "My Library", icon: BookmarkIcon },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
    { href: "/reviews", label: "Reviews", icon: Star },
  ];

  // User menu items based on role
  const getUserMenuItems = () => {
    const baseItems = [
      { href: "/profile", label: "Profile", icon: User },
      { href: "/my-library", label: "My Library", icon: BookmarkIcon },
    ];

    const adminItems = [
      { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
      { href: "/admin/users", label: "Manage Users", icon: Users },
      { href: "/admin/books", label: "Manage Books", icon: Plus },
      { href: "/admin/settings", label: "Site Settings", icon: Shield },
    ];

    return user?.isAdmin ? [...adminItems] : baseItems;
  };

  return (
    <nav
      className={`bg-gradient-to-r from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] border-b-2 border-amber-200/60 shadow-lg ${className}`}
    >
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo2.png"
                  alt="Site logo"
                  width={40}
                  height={60}
                />
              </div>
              <div>
                <h1
                  className="text-2xl font-serif text-amber-800 group-hover:text-amber-900 transition-colors"
                  style={{
                    fontFamily: "'Crimson Text', 'Times New Roman', serif",
                  }}
                >
                  Ex Libris
                </h1>
                <div className="h-px bg-gradient-to-r from-amber-600 to-transparent w-16 opacity-60"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-amber-800 hover:text-amber-900 hover:bg-[#bb6b01] transition-all duration-200 font-serif text-sm group"
                  >
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 opacity-60" />
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-full focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60 text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Avatar Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-amber-100/50 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <div className="h-8 w-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-serif text-sm shadow-md">
                        {user?.username?.charAt(0)?.toUpperCase() || ""}
                      </div>
                      {user.isAdmin && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-700 rounded-full flex items-center justify-center">
                          <Shield className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-amber-600 group-hover:text-amber-800 transition-colors" />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] rounded-lg shadow-xl border border-amber-200/60 py-2 z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-amber-200/40">
                        <p className="font-serif text-amber-800 font-semibold">
                          {user.username}
                        </p>
                        <p className="text-sm text-amber-600 opacity-80">
                          {user.email}
                        </p>
                        {user.isAdmin && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-serif bg-amber-200 text-amber-800 mt-1">
                            <Shield className="h-3 w-3 mr-1" />
                            Administrator
                          </span>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {getUserMenuItems().map((item, index) => {
                          const Icon = item.icon;
                          const isAdminItem = item.href.startsWith("/admin");
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMenus}
                              className={`flex items-center space-x-3 px-4 py-2 text-sm font-serif transition-colors ${
                                isAdminItem
                                  ? "text-amber-700 hover:bg-[#bb6b01] hover:text-amber-900"
                                  : "text-amber-800 hover:bg-[#bb6b01] hover:text-amber-900"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-amber-200/40 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm font-serif text-amber-800 hover:bg-red-600 hover:text-amber-900 transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Guest User Buttons */
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-amber-800 hover:text-amber-900 font-serif text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-serif text-sm rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Join Library
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-amber-800 hover:text-amber-900 hover:bg-amber-100/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-200/40 py-4">
            {/* Search Bar (Mobile) */}
            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600 opacity-60" />
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  className="w-full pl-10 pr-4 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-full focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 placeholder-amber-500/60 text-sm"
                />
              </div>
            </div>

            {user ? (
              <>
                {/* Navigation Links (Mobile) */}
                <div className="space-y-1 px-4 mb-4">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className="flex items-center space-x-3 px-3 py-2 rounded-md text-amber-800 hover:text-amber-900 hover:bg-amber-100/50 transition-colors font-serif text-sm"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* User Menu Items (Mobile) */}
                <div className="border-t border-amber-200/40 pt-4 px-4 space-y-1">
                  {getUserMenuItems().map((item) => {
                    const Icon = item.icon;
                    const isAdminItem = item.href.startsWith("/admin");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md font-serif text-sm transition-colors ${
                          isAdminItem
                            ? "text-amber-700 hover:bg-amber-200/50 hover:text-amber-900"
                            : "text-amber-800 hover:bg-amber-100/50 hover:text-amber-900"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-amber-800 hover:bg-amber-100/50 hover:text-amber-900 font-serif text-sm transition-colors w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              /* Guest Mobile Menu */
              <div className="space-y-2 px-4">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="block px-3 py-2 text-amber-800 hover:text-amber-900 font-serif text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="block px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-serif text-sm rounded-md text-center"
                >
                  Join Library
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
