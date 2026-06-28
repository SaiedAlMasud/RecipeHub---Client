"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import HomePage from "../components/home/HomePage";

const Homepage = () => {
  const router = useRouter();
  const { data, isPending } = useAuth();
  const user = data?.user;

  useEffect(() => {
    if (isPending) return;

    if (user?.role === "admin") {
      router.replace("/dashboard");
    }
  }, [user, isPending, router]);


  if (isPending) {
    return null;
  }

  if (user?.role === "admin") {
    return null;
  }
  return (
    <div>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </div>
  );
};

export default Homepage;