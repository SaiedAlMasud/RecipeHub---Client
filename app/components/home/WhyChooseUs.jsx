"use client";

import { motion } from "framer-motion";
import {
    ChefHat,
    Heart,
    Crown,
    Users,
} from "lucide-react";

const features = [
    {
        icon: ChefHat,
        title: "Thousands of Recipes",
        description:
            "Explore delicious recipes shared by passionate home cooks and professional chefs.",
    },
    {
        icon: Heart,
        title: "Save Favorites",
        description:
            "Keep all your favorite recipes in one place and access them anytime.",
    },
    {
        icon: Crown,
        title: "Premium Content",
        description:
            "Unlock exclusive premium recipes curated by experienced chefs.",
    },
    {
        icon: Users,
        title: "Food Community",
        description:
            "Join a growing community of food lovers, share recipes, and inspire others.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-orange-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-16 text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                        Why Choose RecipeHub
                    </p>

                    <h2 className="mt-4 text-5xl font-bold">
                        Everything You Need
                        <br />
                        In One Platform
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        Discover, save, and share amazing recipes while connecting
                        with food enthusiasts from around the world.
                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                                    <Icon
                                        className="text-orange-500"
                                        size={40}
                                    />
                                </div>

                                <h3 className="mb-4 text-2xl font-bold">
                                    {feature.title}
                                </h3>

                                <p className="leading-7 text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}