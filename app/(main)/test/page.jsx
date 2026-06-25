"use client";

import useAuth from "@/hooks/useAuth";



export default function TestPage() {
  const session = useAuth();

  console.log("Session:", session);

  return (
    <div className="p-10">
      <h1 className="mb-5 text-3xl font-bold">
        Better Auth Session Test
      </h1>

      <pre className="rounded-lg bg-gray-900 p-5 text-green-400 overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}