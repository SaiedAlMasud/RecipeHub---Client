"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight } from "lucide-react";

export default function HeroBanner() {
    return (
        <section
            className="relative h-[90vh] w-full bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1585735119407-b037131a352b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/65" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 text-lg font-semibold uppercase tracking-[0.3em] text-orange-400"
                    >
                        Welcome to RecipeHub
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-5xl font-extrabold leading-tight text-white md:text-7xl"
                    >
                        Discover.
                        <br />
                        Cook.
                        <br />
                        Share.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mt-6 max-w-xl text-lg leading-8 text-gray-300"
                    >
                        Explore thousands of delicious recipes from passionate
                        home cooks and professional chefs. Save your favorites,
                        share your creations, and become part of the RecipeHub
                        community.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="mt-10 flex flex-wrap gap-5"
                    >
                        <Link
                            href="/recipes"
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
                        >
                            <ChefHat size={20} />
                            Explore Recipes
                        </Link>

                        <Link
                            href="/featured"
                            className="flex items-center gap-2 rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
                        >
                            Featured Recipes
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-14 grid grid-cols-3 gap-8 text-white"
                    >
                        <div>
                            <h2 className="text-4xl font-bold text-orange-400">
                                10K+
                            </h2>
                            <p className="mt-2 text-gray-300">
                                Recipes
                            </p>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold text-orange-400">
                                5K+
                            </h2>
                            <p className="mt-2 text-gray-300">
                                Chefs
                            </p>
                        </div>

                        <div>
                            <h2 className="text-4xl font-bold text-orange-400">
                                50K+
                            </h2>
                            <p className="mt-2 text-gray-300">
                                Food Lovers
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}