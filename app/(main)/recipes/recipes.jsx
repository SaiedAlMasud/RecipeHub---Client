"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecipePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchRecipes(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    const fetchRecipes = async (
        page = 1,
        category = "All"
    ) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes?page=${page}&limit=6&category=${category}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch recipes");
            }

            const data = await response.json();

            setRecipes(data.recipes);

            setCurrentPage(data.currentPage);

            setTotalPages(data.totalPages);

        } catch (err) {

            console.error(err);

            setError("Failed to load recipes");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <section className="px-6 py-10">
            {/* Page Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Browse Recipes
                </h1>

                <p className="mt-2 text-gray-500">
                    Discover delicious recipes shared by our community.
                </p>
            </div>

            <div className="mb-8 flex items-center gap-4">

                <label className="font-medium">
                    Category:
                </label>

                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setCurrentPage(1);
                        setSelectedCategory(e.target.value);
                    }}
                    className="rounded-lg border px-4 py-2"
                >
                    <option value="All">All Categories</option>

                    <option value="Breakfast">
                        Breakfast
                    </option>

                    <option value="Lunch">
                        Lunch
                    </option>

                    <option value="Dinner">
                        Dinner
                    </option>

                    <option value="Dessert">
                        Dessert
                    </option>

                    <option value="Snacks">
                        Snacks
                    </option>

                    <option value="Drinks">
                        Drinks
                    </option>

                </select>

            </div>

            {/* Empty State */}
            {recipes.length === 0 ? (
                <div className="rounded-2xl border p-10 text-center">
                    <h2 className="text-2xl font-semibold">
                        No Recipes Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Recipes will appear here once users start sharing them.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Image */}
                            <Image
                                src={
                                    recipe.recipeImage ||
                                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                                }
                                alt={recipe.recipeName || "Recipe Image"}
                                width={500}
                                height={300}
                                className="h-52 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-5">
                                <h2 className="line-clamp-1 text-xl font-bold">
                                    {recipe.recipeName}
                                </h2>

                                <div className="mt-3 space-y-2 text-sm text-gray-600">
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
                                            Likes:
                                        </span>{" "}
                                        {recipe.likesCount || 0}
                                    </p>
                                </div>

                                {/* Button */}
                                <Link
                                    href={`/recipes/${recipe._id}`}
                                    className="mt-5 inline-block w-full rounded-xl bg-orange-500 px-4 py-2 text-center font-medium text-white transition hover:bg-orange-600"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


            )}

            <div className="mt-12 flex items-center justify-center gap-2">

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage((prev) => prev - 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from(
                    {
                        length: totalPages,
                    },
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(index + 1)
                            }
                            className={`rounded-lg px-4 py-2 ${currentPage === index + 1
                                    ? "bg-orange-500 text-white"
                                    : "border"
                                }`}
                        >
                            {index + 1}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage((prev) => prev + 1)
                    }
                    className="rounded-lg border px-4 py-2 disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </section>
    );
}