"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Users, BookOpen, Crown, DollarSign, Flag } from "lucide-react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                setStats({
                    error: data.message,
                });

                return;
            }

            setStats(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (stats?.error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-bold text-red-500">
                    {stats.error}
                </h1>
            </div>
        );
    }

    const cards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
        },
        {
            title: "Total Recipes",
            value: stats.totalRecipes,
            icon: BookOpen,
        },
        {
            title: "Premium Users",
            value: stats.premiumUsers,
            icon: Crown,
        },
        {
            title: "Revenue",
            value: `$${stats.totalRevenue}`,
            icon: DollarSign,
        },
        {
            title: "Reports",
            value: stats.totalReports,
            icon: Flag,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Welcome back, Admin.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {card.title}
                                        </p>

                                        <h2 className="mt-3 text-3xl font-bold">
                                            {card.value}
                                        </h2>
                                    </div>

                                    <div className="rounded-xl bg-orange-100 p-3">
                                        <Icon className="h-7 w-7 text-[#FF6B35]" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                        Quick Actions
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                        <Link
                            href="/dashboard/admin/users"
                            className="group rounded-2xl border border-orange-100 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:shadow-lg"
                        >
                            <div className="text-4xl transition group-hover:scale-110">
                                👥
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-white">
                                Manage Users
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 group-hover:text-orange-100">
                                View, block and manage platform users.
                            </p>
                        </Link>

                        <Link
                            href="/dashboard/admin/recipes"
                            className="group rounded-2xl border border-orange-100 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:shadow-lg"
                        >
                            <div className="text-4xl transition group-hover:scale-110">
                                🍲
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-white">
                                Manage Recipes
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 group-hover:text-orange-100">
                                Edit, feature and remove recipes.
                            </p>
                        </Link>

                        <Link
                            href="/dashboard/admin/reports"
                            className="group rounded-2xl border border-orange-100 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:shadow-lg"
                        >
                            <div className="text-4xl transition group-hover:scale-110">
                                🚩
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-white">
                                Reports
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 group-hover:text-orange-100">
                                Review and resolve user reports.
                            </p>
                        </Link>

                        <Link
                            href="/dashboard/admin/transactions"
                            className="group rounded-2xl border border-orange-100 bg-orange-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:shadow-lg"
                        >
                            <div className="text-4xl transition group-hover:scale-110">
                                💳
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-white">
                                Transactions
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 group-hover:text-orange-100">
                                View payments and revenue history.
                            </p>
                        </Link>

                    </div>
                </div>

                <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">

                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                        Revenue Breakdown
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
                            <p className="text-sm text-gray-500">
                                Premium Membership
                            </p>

                            <h3 className="mt-3 text-3xl font-bold text-[#FF6B35]">
                                $ {stats.premiumRevenue}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
                            <p className="text-sm text-gray-500">
                                Recipe Sales
                            </p>

                            <h3 className="mt-3 text-3xl font-bold text-[#FF6B35]">
                                $ {stats.recipeRevenue}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
                            <p className="text-sm text-gray-500">
                                Total Revenue
                            </p>

                            <h3 className="mt-3 text-3xl font-bold text-[#FF6B35]">
                                $ {stats.totalRevenue}
                            </h3>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}