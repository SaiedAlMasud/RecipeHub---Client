"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function EditRecipePage({ params }) {
    const { id } = use(params);

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`
            );

            const data = await response.json();

            setRecipe(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load recipe");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUpdating(true);

        const form = e.target;

        const updatedRecipe = {
            recipeName: form.recipeName.value,
            recipeImage: form.recipeImage.value,
            category: form.category.value,
            cuisineType: form.cuisineType.value,
            difficultyLevel: form.difficultyLevel.value,
            preparationTime: form.preparationTime.value,
            ingredients: form.ingredients.value,
            instructions: form.instructions.value,
            updatedAt: new Date(),
        };

        try {
            const tokenData = await authClient.token();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                    body: JSON.stringify(updatedRecipe),
                }
            );

            const result = await response.json();

            if (
                result.modifiedCount > 0 ||
                result.matchedCount > 0
            ) {
                toast.success("Recipe updated successfully");

                router.push("/dashboard/my-recipes");
            } else {
                toast.error("No changes detected");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update recipe");
        } finally {
            setUpdating(false);
        }
    };

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

    if (!recipe) {
        return (
            <div className="flex h-screen items-center justify-center">
                <h2 className="text-2xl font-semibold">
                    Recipe Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-amber-100 p-6">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Edit Recipe
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Update your recipe information.
                    </p>
                </div>

                <Card className="shadow-xl p-5">


                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Preview Image */}
                            <div className="relative h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={
                                        recipe.recipeImage ||
                                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                                    }
                                    alt={recipe.recipeName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Recipe Name */}
                            <div className="space-y-2">
                                <Label>
                                    Recipe Name
                                </Label>

                                <Input
                                    name="recipeName"
                                    defaultValue={
                                        recipe.recipeName
                                    }
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label>
                                    Recipe Image URL
                                </Label>

                                <Input
                                    name="recipeImage"
                                    defaultValue={
                                        recipe.recipeImage
                                    }
                                    required
                                />
                            </div>

                            {/* Category + Cuisine */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>
                                        Category
                                    </Label>

                                    <Input
                                        name="category"
                                        defaultValue={
                                            recipe.category
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>
                                        Cuisine Type
                                    </Label>

                                    <Input
                                        name="cuisineType"
                                        defaultValue={
                                            recipe.cuisineType
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Difficulty + Time */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>
                                        Difficulty Level
                                    </Label>

                                    <select
                                        name="difficultyLevel"
                                        defaultValue={
                                            recipe.difficultyLevel
                                        }
                                        className="w-full rounded-md border p-2"
                                        required
                                    >
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
                                    <Label>
                                        Preparation Time
                                    </Label>

                                    <Input
                                        name="preparationTime"
                                        defaultValue={
                                            recipe.preparationTime
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="space-y-2">
                                <Label>
                                    Ingredients
                                </Label>

                                <Textarea
                                    name="ingredients"
                                    rows={6}
                                    defaultValue={
                                        recipe.ingredients
                                    }
                                    required
                                />
                            </div>

                            {/* Instructions */}
                            <div className="space-y-2">
                                <Label>
                                    Instructions
                                </Label>

                                <Textarea
                                    name="instructions"
                                    rows={8}
                                    defaultValue={
                                        recipe.instructions
                                    }
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={updating}
                                className="w-full text-lg text-white py-5"
                            >
                                {updating
                                    ? "Updating Recipe..."
                                    : "Update Recipe"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}