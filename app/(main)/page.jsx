"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Homepage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.success("🎉 Registration Successful!");

      router.replace("/", {
        scroll: false,
      });
    }

    if (searchParams.get("loggedIn") === "true") {
      toast.success("👋 Welcome back!");

      router.replace("/", {
        scroll: false,
      });
    }
  }, [searchParams, router]);

  return (
    <div>
      Homepage
    </div>
  );
};

export default Homepage;