"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        completePayment();
    }, []);

    async function completePayment() {
        try {
            const sessionId = searchParams.get("session_id");

            if (!sessionId) {
                toast.error("Invalid payment session.");
                router.replace("/payment");
                return;
            }

            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payment-success`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                    body: JSON.stringify({
                        sessionId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                router.replace("/payment");
                return;
            }

            await authClient.getSession({
                query: {
                    disableCookieCache: true,
                },
            });

            setCompleted(true);

            toast.success("Premium Membership Activated!");

            setTimeout(() => {
                router.replace("/dashboard/profile");
            }, 5000);
        } catch (error) {
            console.error(error);
            toast.error("Payment verification failed.");
            router.replace("/payment");
        }
    }

    if (!completed) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-white to-amber-50 p-6">
            <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <span className="text-5xl">✅</span>
                </div>

                <h1 className="mt-8 text-4xl font-bold">
                    Payment Successful
                </h1>

                <p className="mt-4 text-gray-500">
                    Congratulations!
                </p>

                <p className="mt-2 text-gray-500">
                    Your Premium Membership has been activated successfully.
                </p>

                <p className="mt-8 text-sm text-gray-400">
                    Redirecting to your profile...
                </p>
            </div>
        </div>
    );
}