"use client";

import { authClient } from "@/lib/auth-client";

export default function TestPage() {

    const handleClick = async () => {
        const tokenData = await authClient.token();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/6a3f8731c57f111e1bb709a3`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenData.data.token}`,
                },
            }
        );

        const data = await response.json();

        console.log(data);

        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <button
                onClick={handleClick}
                className="rounded bg-orange-500 px-6 py-3 text-white"
            >
                Test Featured Recipes
            </button>
        </div>
    );
}