"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Users, BookOpen, Crown, DollarSign, Flag } from "lucide-react";

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
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF6B35]" />
            </div>
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
            </div>
        </div>
    );
}