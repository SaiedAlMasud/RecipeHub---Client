"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PopularRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const fetchPopularRecipes = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/popular`
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
            <div className="py-24 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <section id="popular-recipes" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-14 text-center">

                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                        Most Loved
                    </span>

                    <h2 className="mt-3 text-5xl font-bold">
                        Popular Recipes
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Explore the recipes that our community loves the most.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {recipes.map((recipe, index) => (

                        <motion.div
                            key={recipe._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                        >

                            <div className="relative h-60">

                                <Image
                                    src={recipe.recipeImage}
                                    alt={recipe.recipeName}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            <div className="space-y-4 p-6">

                                <h3 className="line-clamp-1 text-2xl font-bold">
                                    {recipe.recipeName}
                                </h3>

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-2 text-red-500">

                                        <Heart
                                            size={18}
                                            fill="currentColor"
                                        />

                                        <span className="font-semibold">
                                            {recipe.likesCount || 0}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <User size={18} />

                                        <span>
                                            {recipe.authorName}
                                        </span>

                                    </div>

                                </div>

                                <Link
                                    href={`/recipes/${recipe._id}`}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                                >
                                    View Recipe

                                    <ArrowRight size={18} />
                                </Link>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
}