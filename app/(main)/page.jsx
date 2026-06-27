"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FeaturedRecipes from "../components/home/FeaturedRecipes";
import HeroBanner from "../components/home/HeroBanner";
import PopularRecipes from "../components/home/PopularRecipes";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HowItWorks from "../components/home/HowItWorks";
import Footer from "../components/common/Footer";

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
      <HeroBanner />
      <FeaturedRecipes />
      <PopularRecipes />
      <WhyChooseUs />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Homepage;