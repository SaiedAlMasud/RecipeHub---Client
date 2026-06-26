"use client";

import { authClient } from "@/lib/auth-client";

export default function TestPage() {
    const handleClick = async () => {
        try {
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
                        sessionId: "cs_test_a18wa1er1LcinqJwBjESqWTjGXJU1riwZpds22qQ19opj9M49P75ThcBNW",
                    }),
                }
            );

            const data = await response.json();

            console.log(data);

            alert(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(error);
            alert("Request Failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <button
                onClick={handleClick}
                className="rounded bg-green-600 px-6 py-3 text-white"
            >
                Test Payment Success
            </button>
        </div>
    );
}