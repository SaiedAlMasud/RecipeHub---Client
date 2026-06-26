"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PremiumUpgradeCard from "@/app/components/PremiumUpgradeCard";
import AddRecipeForm from "@/app/components/AddRecipeForm";
import LoadingSpinner from "@/app/components/LoadingSpinner";


export default function AddRecipePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [limitInfo, setLimitInfo] = useState(null);

    const [checkingLimit, setCheckingLimit] =
        useState(true);

    async function checkRecipeLimit() {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipe-limit`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            setLimitInfo(data);
        } catch (error) {
            console.error(error);

            toast.error("Failed to check recipe limit.");
        } finally {
            setCheckingLimit(false);
        }
    }

    useEffect(() => {
        checkRecipeLimit();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const session = await authClient.getSession();

        const user = session.data.user;

        const recipe = {
            recipeName: form.recipeName.value,
            recipeImage: form.recipeImage.value,
            category: form.category.value,
            cuisineType: form.cuisineType.value,
            difficultyLevel: form.difficultyLevel.value,
            preparationTime: form.preparationTime.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,

            authorId: user.id,
            authorName: user.name,
            authorEmail: user.email,
            authorImage: user.image,

            likesCount: 0,
            isFeatured: false,
            status: "active",

            createdAt: new Date(),
            updatedAt: new Date(),
        };

        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                    body: JSON.stringify(recipe),
                }
            );

            const data = await response.json();

            if (data.insertedId) {
                toast.success("Recipe Added Successfully");

                form.reset();

                await checkRecipeLimit();

                router.push("/dashboard/my-recipes");
            }
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (loading || checkingLimit) {
        return <LoadingSpinner />;
    }

    const hasReachedLimit =
        limitInfo &&
        !limitInfo.isPremium &&
        !limitInfo.canAddRecipe;

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-amber-100 p-6">
            {hasReachedLimit ? (
                <PremiumUpgradeCard />
            ) : (
                <AddRecipeForm
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            )}
        </div>
    );
}