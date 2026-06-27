"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedRecipes();
    }, []);

    const fetchFeaturedRecipes = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/featured`
            );

            const data = await response.json();

            setRecipes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-60 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF6B35]" />
            </div>
        );
    }

    if (recipes.length === 0) {
        return null;
    }

    return (
        <section id="featured-recipes" className="mx-auto max-w-7xl px-4 py-20">

            <div className="mb-12 text-center">

                <h2 className="text-4xl font-bold">
                    ⭐ Featured Recipes
                </h2>

                <p className="mt-3 text-gray-500">
                    Hand-picked recipes selected by our administrators.
                </p>

            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {recipes.map((recipe) => (

                    <div
                        key={recipe._id}
                        className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >

                        <div className="relative h-60">

                            <Image
                                src={recipe.recipeImage}
                                alt={recipe.recipeName}
                                fill
                                className="object-cover"
                            />

                        </div>

                        <div className="p-6">

                            <h3 className="text-2xl font-bold">
                                {recipe.recipeName}
                            </h3>

                            <div className="mt-5 space-y-2 text-gray-600">

                                <p>
                                    <strong>Category:</strong>{" "}
                                    {recipe.category}
                                </p>

                                <p>
                                    <strong>Cuisine:</strong>{" "}
                                    {recipe.cuisineType}
                                </p>

                                <p>
                                    <strong>Preparation:</strong>{" "}
                                    {recipe.preparationTime}
                                </p>

                            </div>

                            <Link
                                href={`/recipes/${recipe._id}`}
                                className="mt-6 inline-block rounded-xl bg-[#FF6B35] px-5 py-3 font-medium text-white transition hover:opacity-90"
                            >
                                View Recipe
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}