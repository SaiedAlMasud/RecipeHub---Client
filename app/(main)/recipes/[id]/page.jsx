"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function RecipeDetailsPage({ params }) {
    const { id } = use(params);
    console.log("Recipe ID:", id); // Log the recipe ID to the console
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRecipe();
    }, []);

    async function fetchRecipe() {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch recipe");
            }

            const data = await response.json();

            setRecipe(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load recipe");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold">Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold text-red-500">
                    {error}
                </h2>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Recipe Not Found
                </h2>
            </div>
        );
    }

    return (
        <section className="w-full px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="relative h-full min-h-[500px]">
                    <Image
                        src={
                            recipe.recipeImage ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                        }
                        alt={recipe.recipeName || "Recipe Image"}
                        fill
                        className="rounded-3xl object-cover"
                        priority
                    />

                </div>
                {/* Content */}
                <div className="mt-8">
                    <h1 className="text-4xl font-bold">
                        {recipe.recipeName}
                    </h1>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm">
                            {recipe.category}
                        </span>

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm">
                            {recipe.cuisineType}
                        </span>

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm">
                            {recipe.difficultyLevel}
                        </span>
                    </div>

                    {/* Information */}
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border p-5">
                            <h3 className="font-semibold mb-2">
                                Preparation Time
                            </h3>

                            <p>{recipe.preparationTime}</p>
                        </div>

                        <div className="rounded-2xl border p-5">
                            <h3 className="font-semibold mb-2">
                                Likes
                            </h3>

                            <p>{recipe.likesCount || 0}</p>
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold">
                            Ingredients
                        </h2>

                        <div className="rounded-2xl border p-5">
                            <p className="whitespace-pre-wrap">
                                {recipe.ingredients}
                            </p>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-10">
                        <h2 className="mb-4 text-2xl font-bold">
                            Instructions
                        </h2>

                        <div className="rounded-2xl border p-5">
                            <p className="whitespace-pre-wrap">
                                {recipe.instructions}
                            </p>
                        </div>
                    </div>

                    {/* Author */}
                    <div className="mt-10 rounded-2xl border p-5">
                        <h2 className="mb-2 text-xl font-bold">
                            Author
                        </h2>

                        <p>
                            <strong>Name:</strong>{" "}
                            {recipe.authorName || "Unknown"}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {recipe.authorEmail || "N/A"}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="rounded-xl bg-red-500 px-5 py-3 text-white">
                            ❤️ Like
                        </button>

                        <button className="rounded-xl bg-yellow-500 px-5 py-3 text-white">
                            ⭐ Favorite
                        </button>

                        <button className="rounded-xl bg-purple-500 px-5 py-3 text-white">
                            🚨 Report
                        </button>

                        <button className="rounded-xl bg-green-600 px-5 py-3 text-white">
                            💳 Purchase Recipe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}