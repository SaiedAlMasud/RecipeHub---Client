"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { LoaderCircle, Eye, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    async function fetchFavorites() {
        try {
            setLoading(true);

            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            setFavorites(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function removeFavorite(recipeId) {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/favorites/${recipeId}`,
                {
                    method: "DELETE",
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

            toast.success("Favorite removed.");

            setFavorites((prev) =>
                prev.filter((recipe) => recipe._id !== recipeId)
            );
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF6B35]"></div>
                    <p className="mt-4">Loading Recipe...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold">
                    My Favorite Recipes
                </h1>

                <p className="mt-2 text-gray-500">
                    All recipes you have saved.
                </p>
            </div>

            {favorites.length === 0 ? (
                <div className="rounded-3xl border p-20 text-center">
                    <h2 className="text-2xl font-semibold">
                        No favorite recipes found.
                    </h2>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {favorites.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="overflow-hidden rounded-3xl border bg-white shadow-lg transition hover:shadow-xl"
                        >
                            <div className="relative h-56 w-full">
                                <Image
                                    src={
                                        recipe.recipeImage && recipe.recipeImage.trim() !== ""
                                            ? recipe.recipeImage
                                            : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                                    }
                                    alt={recipe.recipeName || "Recipe Image"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            <div className="space-y-4 p-6">
                                <h2 className="line-clamp-1 text-2xl font-bold">
                                    {recipe.recipeName}
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm">
                                        {recipe.category}
                                    </span>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm">
                                        {recipe.cuisineType}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>
                                        ⏱ {recipe.preparationTime}
                                    </span>

                                    <span>
                                        ❤️ {recipe.likesCount}
                                    </span>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <Link
                                        href={`/recipes/${recipe._id}`}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-white transition hover:bg-orange-600"
                                    >
                                        <Eye size={18} />
                                        View Details
                                    </Link>

                                    <button
                                        onClick={() => removeFavorite(recipe._id)}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
                                    >
                                        <Trash2 size={18} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}