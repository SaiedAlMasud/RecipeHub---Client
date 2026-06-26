"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddRecipeForm({ handleSubmit, loading }) {
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
}