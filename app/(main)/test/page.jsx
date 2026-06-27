"use client";

import { authClient } from "@/lib/auth-client";

export default function TestPage() {
    const handleClick = async () => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/6a3d4a452d9b3305255f5502/block`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
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