"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Home,
  BookOpen,
  Star,
  Flame,
  LayoutDashboard,
  PlusCircle,
  ChefHat,
  Heart,
  ShoppingBag,
  User,
  Users,
  UtensilsCrossed,
  ShieldAlert,
  CreditCard,
  LogOut,
  LogIn,
  UserPlus,
  Crown,
} from "lucide-react";

import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { signOut } from "@/lib/auth-client";

const publicLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Browse Recipes",
    href: "/recipes",
    icon: BookOpen,
  },
];

const userLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add Recipe",
    href: "/dashboard/add-recipe",
    icon: PlusCircle,
  },
  {
    label: "My Recipes",
    href: "/dashboard/my-recipes",
    icon: ChefHat,
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    label: "Purchased Recipes",
    href: "/dashboard/purchased-recipes",
    icon: ShoppingBag,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

const adminLinks = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Manage Recipes",
    href: "/dashboard/admin/recipes",
    icon: UtensilsCrossed,
  },
  {
    label: "Reports",
    href: "/dashboard/admin/reports",
    icon: ShieldAlert,
  },
  {
    label: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: CreditCard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useAuth();
  const user = data?.user;

  const handleLogout = async () => {
    try {
      await signOut();

      toast.success("Logged out successfully.");

      router.push("/login");
    } catch (error) {
      console.error(error);

      toast.error("Logout failed.");
    }
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-[#111827] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <h1 className="bg-linear-to-r from-[#FF512F] via-[#F09819] to-[#FFD200] bg-clip-text text-3xl font-bold text-transparent">
          RecipeHub
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Share • Discover • Cook
        </p>
        {user && (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <Image
              src={
                user.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              width={48}
              height={48}
              alt={user.name}
              className="rounded-full"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-white">
                {user.name}
              </p>

              <p className="truncate text-xs text-gray-400">
                {user.email}
              </p>

              {user.isPremium && (
                <span className="mt-1 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                  PREMIUM
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {/* Public Links */}
          {(!user || user.role !== "admin") &&
            publicLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-linear-to-r from-[#FF512F] to-[#F09819] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

          {/* User Links */}
          {user && user.role !== "admin" &&
            userLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-linear-to-r from-[#FF512F] to-[#F09819] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

          {/* Admin Links */}
          {user?.role === "admin" &&
            adminLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-linear-to-r from-[#FF512F] to-[#F09819] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
        </div>

        {!user && (
          <div className="space-y-2 border-t border-white/10 pt-6">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              <LogIn size={20} />
              Login
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              <UserPlus size={20} />
              Register
            </Link>
          </div>
        )}
      </div>

      {user && (
        <div className="border-t border-white/10 p-5">
          <button
            onClick={handleLogout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-sm font-medium transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}