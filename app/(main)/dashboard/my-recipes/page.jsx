"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyRecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const tokenData = await authClient.token();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/my-recipes`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );
            const data = await response.json();
            setRecipes(data.recipes || data || []);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this recipe?")) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
                    { method: "DELETE" }
                );
                if (response.ok) {
                    setRecipes(recipes.filter((r) => r._id !== id));
                    toast.success("Recipe deleted successfully");
                }
            } catch (error) {
                //console.error("Delete error:", error);
                toast.error("Failed to delete recipe");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B35] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading recipes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-amber-100 p-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">My Recipes</h1>

            {recipes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <p className="text-gray-500 text-lg">You have not created any recipes yet.</p>
                    <button
                        onClick={() => router.push("/dashboard/add-recipe")}
                        className="mt-4 bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#e55a2b] transition"
                    >
                        Create Your First Recipe
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="text-white" style={{
                                    background: "linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)"
                                }}>
                                    <TableHead className="p-4 text-left text-sm font-semibold text-white">Recipe</TableHead>
                                    <TableHead className="p-4 text-left text-sm font-semibold text-white">Image</TableHead>
                                    <TableHead className="p-4 text-left text-sm font-semibold text-white">Category</TableHead>
                                    <TableHead className="p-4 text-left text-sm font-semibold text-white">Cuisine</TableHead>
                                    <TableHead className="p-4 text-left text-sm font-semibold text-white">Prep Time</TableHead>
                                    <TableHead className="p-4 text-center text-sm font-semibold text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recipes.map((recipe) => (
                                    <TableRow key={recipe._id} className="border-b hover:bg-gray-50 transition">
                                        <TableCell className="p-4 font-medium text-gray-800">
                                            {recipe.recipeName}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                                                <Image
                                                    src={
                                                        recipe.recipeImage ||
                                                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                                                    }
                                                    alt={recipe.recipeName}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 48px"
                                                    unoptimized={!recipe.recipeImage?.includes('localhost')}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                                                {recipe.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-4 text-gray-600">{recipe.cuisineType}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Clock className="text-orange-400" size={18} />
                                                {recipe.preparationTime}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => router.push(`/recipes/${recipe._id}`)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/dashboard/my-recipes/edit/${recipe._id}`)}
                                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(recipe._id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}