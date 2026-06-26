"use client";

import { Crown } from "lucide-react";

export default function PremiumUpgradeCard() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-6">
            <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                    <Crown className="h-10 w-10 text-amber-500" />
                </div>

                <h2 className="text-3xl font-bold">
                    Upgrade to Premium
                </h2>

                <p className="mt-4 text-gray-500">
                    You`&apos`ve reached the free limit of{" "}
                    <strong>2 recipes</strong>.
                </p>

                <p className="mt-2 text-gray-500">
                    Upgrade to Premium and enjoy unlimited recipe uploads.
                </p>

                <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-left">
                    <h3 className="mb-3 font-semibold">
                        Premium Benefits
                    </h3>

                    <ul className="space-y-2 text-gray-600">
                        <li>✔ Unlimited recipe uploads</li>
                        <li>✔ Premium badge</li>
                        <li>✔ Early access to new features</li>
                        <li>✔ Priority support</li>
                    </ul>
                </div>

                <button className="mt-8 w-full rounded-xl bg-linear-to-r from-[#FF6B35] to-[#FF9F1C] py-3 text-lg font-semibold text-white transition hover:opacity-90">
                    Upgrade Now
                </button>
            </div>
        </div>
    );
}