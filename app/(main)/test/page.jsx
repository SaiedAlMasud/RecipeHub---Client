"use client";

import { authClient } from "@/lib/auth-client";

export default function TestPage() {
    const handleClick = async () => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/favorites/check/6a3e08ad95911be1ce67fd7c`,
                {
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
                className="rounded bg-blue-600 px-6 py-3 text-white"
            >
                Test Check Favorite
            </button>
        </div>
    );
}