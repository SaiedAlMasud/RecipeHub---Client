"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const sidebarLinks = [
  {
    title: "Main",
    items: [
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
      {
        label: "Featured Recipes",
        href: "/featured",
        icon: Star,
      },
      {
        label: "Popular Recipes",
        href: "/popular",
        icon: Flame,
      },
    ],
  },

  {
    title: "User",
    items: [
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
    ],
  },

  {
    title: "Admin",
    items: [
      {
        label: "Manage Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Manage Recipes",
        href: "/admin/recipes",
        icon: UtensilsCrossed,
      },
      {
        label: "Reports",
        href: "/admin/reports",
        icon: ShieldAlert,
      },
      {
        label: "Transactions",
        href: "/admin/transactions",
        icon: CreditCard,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 border-r border-white/10 bg-[#111827] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <h1 className="bg-linear-to-r from-[#FF512F] via-[#F09819] to-[#FFD200] bg-clip-text text-3xl font-bold text-transparent">
          RecipeHub
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Share • Discover • Cook
        </p>
      </div>

      {/* Navigation */}
      <div className="h-[calc(100vh-100px)] overflow-y-auto px-4 py-6">
        {sidebarLinks.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </h3>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
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
          </div>
        ))}
      </div>
    </aside>
  );
}