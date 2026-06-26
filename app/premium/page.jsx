"use client";

import Link from "next/link";
import { Crown, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
    const features = [
        "Unlimited recipe uploads",
        "Premium badge on your profile",
        "Unlimited favorites",
        "Priority customer support",
        "Early access to upcoming features",
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50">
            <div className="mx-auto max-w-6xl px-6 py-20">

                {/* Hero */}

                <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-r from-[#FF6B35] to-[#FF9F1C]">
                        <Crown className="h-12 w-12 text-white" />
                    </div>

                    <h1 className="mt-8 text-5xl font-bold">
                        Upgrade to Premium
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
                        Unlock all premium features and become a verified
                        premium chef on RecipeHub.
                    </p>
                </div>

                {/* Pricing */}

                <div className="mx-auto mt-16 max-w-md rounded-3xl bg-white p-10 shadow-2xl">

                    <div className="text-center">

                        <p className="text-sm uppercase tracking-widest text-orange-500">
                            Premium Plan
                        </p>

                        <h2 className="mt-3 text-6xl font-bold">
                            ৳499
                        </h2>

                        <p className="mt-2 text-gray-500">
                            One-Time Payment
                        </p>
                    </div>

                    {/* Features */}

                    <div className="mt-10 space-y-4">

                        {features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle className="h-5 w-5 text-green-500" />

                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/payment">
                        <Button className="mt-10 h-12 w-full bg-linear-to-r from-[#FF6B35] to-[#FF9F1C] text-lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Continue to Payment
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}