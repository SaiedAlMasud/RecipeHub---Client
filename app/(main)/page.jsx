"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FeaturedRecipes from "../components/home/FeaturedRecipes";

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
      <FeaturedRecipes />
    </div>
  );
};

export default Homepage;