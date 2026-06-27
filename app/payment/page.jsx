"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import { useState } from "react";

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Payment initialization failed.");
                return;
            }

            if (!data.url) {
                toast.error("Failed to get checkout URL.");
                return;
            }
            window.location.href = data.url;

        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-white to-amber-50">

            <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">

                <div className="text-center">

                    <CreditCard className="mx-auto h-16 w-16 text-orange-500" />

                    <h1 className="mt-6 text-4xl font-bold">
                        Premium Payment
                    </h1>

                    <p className="mt-3 text-gray-500">
                        You are about to purchase the Premium Membership.
                    </p>

                    <div className="mt-8 rounded-2xl bg-orange-50 p-6">

                        <h2 className="text-5xl font-bold text-orange-500">
                            $ 499
                        </h2>

                        <p className="mt-2 text-gray-500">
                            One-Time Premium Access
                        </p>

                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="mt-10 h-12 w-full rounded-xl bg-linear-to-r from-[#FF6B35] to-[#FF9F1C] text-lg font-semibold text-white disabled:opacity-60"
                    >
                        {loading ? "Redirecting..." : "Pay Now"}
                    </button>

                </div>

            </div>

        </div>
    );
}