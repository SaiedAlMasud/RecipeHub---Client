"use client";

import { authClient } from "@/lib/auth-client";

export default function TestPage() {
  const handleClick = async () => {
    const tokenData = await authClient.token();

    console.log(tokenData);
    alert(tokenData?.data?.token || "No token found");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      Get JWT Token
    </button>
  );
}