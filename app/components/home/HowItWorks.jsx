"use client";

import { motion } from "framer-motion";
import {
    UserPlus,
    ChefHat,
    Heart,
    ArrowDown,
} from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Create Your Account",
        description:
            "Sign up in seconds and become a member of the RecipeHub community.",
    },
    {
        icon: ChefHat,
        title: "Share & Discover Recipes",
        description:
            "Upload your own recipes or discover thousands of recipes shared by others.",
    },
    {
        icon: Heart,
        title: "Save, Cook & Enjoy",
        description:
            "Favorite the recipes you love, cook delicious meals, and inspire others.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-20 text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
                        Simple Process
                    </p>

                    <h2 className="mt-4 text-5xl font-bold">
                        How RecipeHub Works
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
                        Start your cooking journey in just three simple steps.
                    </p>

                </div>

                <div className="grid gap-10 lg:grid-cols-3">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                }}
                                className="relative rounded-3xl border bg-white p-10 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                                    <Icon
                                        size={48}
                                        className="text-orange-500"
                                    />
                                </div>

                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                                    {index + 1}
                                </div>

                                <h3 className="mb-4 text-2xl font-bold">
                                    {step.title}
                                </h3>

                                <p className="leading-8 text-gray-600">
                                    {step.description}
                                </p>

                                {index !== steps.length - 1 && (
                                    <ArrowDown
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-orange-400 lg:hidden"
                                        size={36}
                                    />
                                )}
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}