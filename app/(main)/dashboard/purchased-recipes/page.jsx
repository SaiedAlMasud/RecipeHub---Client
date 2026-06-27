"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function PurchasedRecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPurchasedRecipes();
    }, []);

    async function fetchPurchasedRecipes() {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/purchase/my-purchases`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            setRecipes(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load purchased recipes.");

        } finally {

            setLoading(false);

        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        My Purchased Recipes
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Purchased Recipes: {recipes.length}
                    </p>

                </div>

                {recipes.length === 0 ? (

                    <div className="rounded-2xl bg-white p-16 text-center shadow">

                        <h2 className="text-2xl font-bold">
                            No Purchased Recipes
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Purchase recipes to see them here.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {recipes.map((recipe) => (

                            <div
                                key={recipe._id}
                                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div className="relative h-56">

                                    <Image
                                        src={recipe.recipeImage}
                                        alt={recipe.recipeName}
                                        fill
                                        className="object-cover"
                                    />

                                </div>

                                <div className="space-y-3 p-6">

                                    <h2 className="text-2xl font-bold">
                                        {recipe.recipeName}
                                    </h2>

                                    <p>
                                        <span className="font-semibold">
                                            Category:
                                        </span>{" "}
                                        {recipe.category}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Cuisine:
                                        </span>{" "}
                                        {recipe.cuisineType}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Preparation:
                                        </span>{" "}
                                        {recipe.preparationTime}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Purchased:
                                        </span>{" "}
                                        {new Date(
                                            recipe.paidAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Amount:
                                        </span>{" "}
                                        $ {recipe.amount}
                                    </p>

                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        className="mt-5 flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}