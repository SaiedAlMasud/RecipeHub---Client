"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddRecipePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

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
            console.log("Step 1");

            const tokenData = await authClient.token();

            console.log("Step 2", tokenData);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData?.data?.token}`,
                    },
                    body: JSON.stringify(recipe),
                }
            );

            console.log("Step 3");

            const data = await response.json();

            if (data.insertedId) {
                toast("Recipe Added Successfully");

                form.reset();

                router.push("/dashboard/my-recipes");
            }
        } catch (error) {
            console.error(error);
            toast("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-amber-100 p-6">
            <div className="mx-auto w-full max-w-2xl">
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Add New Recipe
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Share your favorite recipe with the RecipeHub community.
                    </p>
                </div>

                <Card className="border-none ring-0 shadow-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Recipe Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Recipe Name */}
                            <div className="space-y-2">
                                <Label>Recipe Name</Label>

                                <Input
                                    name="recipeName"
                                    placeholder="Chicken Biryani"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label>Recipe Image URL</Label>

                                <Input
                                    name="recipeImage"
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            {/* Category & Cuisine */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Category</Label>

                                    <Input
                                        name="category"
                                        placeholder="Main Course"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Cuisine Type</Label>

                                    <Input
                                        name="cuisineType"
                                        placeholder="Bangladeshi"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Difficulty & Time */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Difficulty Level</Label>

                                    <select
                                        name="difficultyLevel"
                                        required
                                        className="w-full rounded-md border bg-background px-3 py-2"
                                    >
                                        <option value="">
                                            Select Difficulty
                                        </option>

                                        <option value="Easy">
                                            Easy
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="Hard">
                                            Hard
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Preparation Time</Label>

                                    <Input
                                        name="preparationTime"
                                        placeholder="60 Minutes"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-2">
                                <Label>Ingredients</Label>

                                <Textarea
                                    name="ingredients"
                                    placeholder="List all ingredients..."
                                    rows={6}
                                    required
                                />
                            </div>

                            {/* Instructions */}
                            <div className="space-y-2">
                                <Label>Instructions</Label>

                                <Textarea
                                    name="instructions"
                                    placeholder="Write cooking instructions..."
                                    rows={8}
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-white text-lg bg-linear-to-r from-[#FF6B35] to-[#FF9F1C] hover:from-[#e55a2b] hover:to-[#e88f16] transition-all duration-300"
                            >
                                {loading ? "Adding Recipe..." : "Publish Recipe"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}