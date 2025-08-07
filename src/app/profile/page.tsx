"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Star,
  Heart,
  BookmarkIcon,
  Award,
  Feather,
  Quote,
  MapPin,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Image from "next/image";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface ProfileStats {
  booksRead: number;
  reviewsWritten: number;
  wishlistItems: number;
  favorites: number;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: "A passionate reader exploring the infinite worlds within books. Currently diving into fantasy epics and classic literature.",
    location: "Lagos, Nigeria",
    website: "",
    favoriteGenres: [
      "Fantasy",
      "Science Fiction",
      "Mystery",
      "Classic Literature",
    ],
    readingGoal: 50,
    profileImage: null as File | null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Mock stats - in real app, fetch from API
  const stats: ProfileStats = {
    booksRead: 127,
    reviewsWritten: 45,
    wishlistItems: 23,
    favorites: 18,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "readingGoal") {
      setProfileData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genre: string) => {
    setProfileData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setProfileData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      // In real app, send to API
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      // In real app, send to API
      toast.success("Password changed successfully!");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  const availableGenres = [
    "Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Thriller",
    "Horror",
    "Historical Fiction",
    "Contemporary",
    "Classic Literature",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Philosophy",
    "Poetry",
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#fdf6e3] py-8 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 opacity-60 mb-4">
              <BookOpen className="h-6 w-6 text-amber-600" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <Feather className="h-4 w-4 text-amber-600" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <h1 className="text-4xl font-serif text-amber-800 mb-2">
              Reader's Profile
            </h1>
            <p className="text-amber-700 font-serif text-sm tracking-wide opacity-80">
              Your Literary Journey & Preferences
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="relative bg-gradient-to-br from-[#fdf6e3] via-[#faf0da] to-[#f5e6c8] rounded-lg shadow-2xl border border-amber-200/60 overflow-hidden">
            {/* Decorative Header */}
            <div className="h-32 bg-gradient-to-r from-amber-400/20 via-amber-500/30 to-amber-400/20 relative">
              <div
                className={`absolute inset-0  bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23d97706\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M20 20c0-11.05 8.95-20 20-20v20h-20z\"/%3E%3C/g%3E%3C/svg%3E')] opacity-30`}
              ></div>
              <div className="absolute top-4 right-4">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/80 hover:bg-white text-amber-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 font-serif text-sm"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            <div className="px-8 pb-8 -mt-16 relative">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 mb-8">
                <div className="relative mx-auto sm:mx-0 mb-4 sm:mb-0">
                  <div className="relative">
                    <div className="h-32 w-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-serif text-3xl shadow-xl border-4 border-white">
                      {profileData.profileImage ? (
                        <Image
                          src={URL.createObjectURL(profileData.profileImage)}
                          alt="Profile"
                          width={128}
                          height={128}
                          className="rounded-full object-cover w-full h-full"
                        />
                      ) : (
                        profileData.username.charAt(0).toUpperCase()
                      )}
                    </div>

                    {user?.isAdmin && (
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-amber-700 rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                    )}

                    {isEditing && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-2 right-2 h-8 w-8 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
                    <h2 className="text-2xl font-serif text-amber-800">
                      {profileData.username}
                    </h2>
                    {user?.isAdmin && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-serif bg-amber-200 text-amber-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-amber-600 font-serif mb-2">
                    {profileData.email}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm text-amber-700">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "Books Read",
                    value: stats.booksRead,
                    icon: BookOpen,
                    color: "from-emerald-400 to-emerald-600",
                  },
                  {
                    label: "Reviews",
                    value: stats.reviewsWritten,
                    icon: Star,
                    color: "from-yellow-400 to-yellow-600",
                  },
                  {
                    label: "Wishlist",
                    value: stats.wishlistItems,
                    icon: Heart,
                    color: "from-rose-400 to-rose-600",
                  },
                  {
                    label: "Favorites",
                    value: stats.favorites,
                    icon: BookmarkIcon,
                    color: "from-purple-400 to-purple-600",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/60 rounded-lg p-4 border border-amber-200/40 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}
                      >
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-serif font-bold text-amber-800">
                          {stat.value}
                        </p>
                        <p className="text-xs font-serif text-amber-600">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Information */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white/40 rounded-lg p-6 border border-amber-200/40">
                    <h3 className="text-lg font-serif text-amber-800 mb-4 flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Basic Information</span>
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-2">
                          Username
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                          />
                        ) : (
                          <p className="font-serif text-amber-800 bg-amber-50/50 px-3 py-2 rounded-md">
                            {profileData.username}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                          />
                        ) : (
                          <p className="font-serif text-amber-800 bg-amber-50/50 px-3 py-2 rounded-md">
                            {profileData.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                            placeholder="Your location"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-amber-600" />
                            <span className="font-serif text-amber-800">
                              {profileData.location || "Not specified"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-2">
                          Website
                        </label>
                        {isEditing ? (
                          <input
                            type="url"
                            name="website"
                            value={profileData.website}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                            placeholder="https://your-website.com"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <LinkIcon className="h-4 w-4 text-amber-600" />
                            {profileData.website ? (
                              <a
                                href={profileData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-serif text-amber-800 hover:text-amber-900 underline"
                              >
                                {profileData.website}
                              </a>
                            ) : (
                              <span className="font-serif text-amber-800">
                                Not specified
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reading Preferences */}
                  <div className="bg-white/40 rounded-lg p-6 border border-amber-200/40">
                    <h3 className="text-lg font-serif text-amber-800 mb-4 flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Reading Preferences</span>
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-2">
                          Annual Reading Goal
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            name="readingGoal"
                            value={profileData.readingGoal}
                            onChange={handleInputChange}
                            min="1"
                            max="1000"
                            className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                          />
                        ) : (
                          <p className="font-serif text-amber-800 bg-amber-50/50 px-3 py-2 rounded-md">
                            {profileData.readingGoal} books
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-serif text-amber-800 mb-3">
                          Favorite Genres
                        </label>
                        {isEditing ? (
                          <div className="space-y-2">
                            {availableGenres.map((genre) => (
                              <label
                                key={genre}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={profileData.favoriteGenres.includes(
                                    genre
                                  )}
                                  onChange={() => handleGenreToggle(genre)}
                                  className="w-4 h-4 text-amber-600 bg-[#fdf6e3] border-amber-300 rounded focus:ring-amber-400 focus:ring-2"
                                />
                                <span className="text-sm font-serif text-amber-800">
                                  {genre}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {profileData.favoriteGenres.map((genre) => (
                              <span
                                key={genre}
                                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-serif"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Bio Section */}
                  <div className="bg-white/40 rounded-lg p-6 border border-amber-200/40">
                    <h3 className="text-lg font-serif text-amber-800 mb-4 flex items-center space-x-2">
                      <Quote className="h-5 w-5" />
                      <span>About Me</span>
                    </h3>

                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800 resize-none"
                        placeholder="Tell us about your reading journey..."
                      />
                    ) : (
                      <p className="font-serif text-amber-800 leading-relaxed italic">
                        "{profileData.bio}"
                      </p>
                    )}
                  </div>

                  {/* Security Section */}
                  <div className="bg-white/40 rounded-lg p-6 border border-amber-200/40">
                    <h3 className="text-lg font-serif text-amber-800 mb-4 flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Account Security</span>
                    </h3>

                    {!isChangingPassword ? (
                      <button
                        onClick={() => setIsChangingPassword(true)}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-serif py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Change Password
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-serif text-amber-800 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 pr-10 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60 hover:opacity-80 transition-opacity"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-serif text-amber-800 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 pr-10 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60 hover:opacity-80 transition-opacity"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-serif text-amber-800 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 pr-10 bg-[#fdf6e3] border border-amber-300/60 rounded-md focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 font-serif text-amber-800"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60 hover:opacity-80 transition-opacity"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handleChangePassword}
                            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-serif py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            Update Password
                          </button>
                          <button
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordData({
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });
                            }}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-serif py-2 px-4 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-amber-200/40">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data to original values
                      setProfileData({
                        username: user?.username || "",
                        email: user?.email || "",
                        bio: "A passionate reader exploring the infinite worlds within books. Currently diving into fantasy epics and classic literature.",
                        location: "Lagos, Nigeria",
                        website: "",
                        favoriteGenres: [
                          "Fantasy",
                          "Science Fiction",
                          "Mystery",
                          "Classic Literature",
                        ],
                        readingGoal: 50,
                        profileImage: null,
                      });
                    }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-serif rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-serif rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
