"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminRecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async (searchValue = "") => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/recipes?search=${encodeURIComponent(searchValue)}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            setRecipes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureRecipe = async (recipeId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/recipes/${recipeId}/feature`,
                {
                    method: "PATCH",
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

            toast.success(data.message);

            fetchRecipes(search);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update recipe.");
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/recipes/${recipeId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to delete recipe.");
                return;
            }

            toast.success(data.message);

            fetchRecipes(search);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete recipe.");
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF6B35]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Manage Recipes
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Total Recipes: {recipes.length}
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={search}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearch(value);
                            fetchRecipes(value);
                        }}
                        className="w-80 rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#FF6B35]"
                    />
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                    <table className="w-full">

                        <thead className="bg-orange-50">
                            <tr>
                                <th className="px-6 py-4 text-left">Recipe</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Author</th>
                                <th className="text-left">Likes</th>
                                <th className="text-left">Featured</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recipes.map((recipe) => (

                                <tr
                                    key={recipe._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <Image
                                                src={recipe.recipeImage}
                                                alt={recipe.recipeName}
                                                width={60}
                                                height={60}
                                                className="rounded-lg object-cover"
                                            />

                                            <div>

                                                <h2 className="font-semibold">
                                                    {recipe.recipeName}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    {recipe.cuisineType}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td>{recipe.category}</td>

                                    <td>{recipe.authorName}</td>

                                    <td>{recipe.likesCount || 0}</td>

                                    <td>
                                        {recipe.featured ? (
                                            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                                                ⭐ Featured
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-gray-100 px-4 py-1 text-sm">
                                                Not Featured
                                            </span>
                                        )}
                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <AlertDialog>

                                                <AlertDialogTrigger asChild>

                                                    <button
                                                        className={`rounded-lg px-4 py-2 text-white ${recipe.featured
                                                            ? "bg-amber-500 hover:bg-amber-600"
                                                            : "bg-blue-500 hover:bg-blue-600"
                                                            }`}
                                                    >
                                                        {recipe.featured
                                                            ? "Unfeature"
                                                            : "Feature"}
                                                    </button>

                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            {recipe.featured
                                                                ? "Remove Featured Recipe?"
                                                                : "Feature Recipe?"}
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>

                                                            {recipe.featured
                                                                ? `Remove "${recipe.recipeName}" from featured recipes?`
                                                                : `Feature "${recipe.recipeName}" on the homepage?`}

                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleFeatureRecipe(recipe._id)
                                                            }
                                                        >
                                                            {recipe.featured
                                                                ? "Remove"
                                                                : "Feature"}
                                                        </AlertDialogAction>

                                                    </AlertDialogFooter>

                                                </AlertDialogContent>

                                            </AlertDialog>

                                            <button
                                                onClick={() =>
                                                    router.push(`/dashboard/admin/recipes/edit/${recipe._id}`)
                                                }
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
                                                        Delete
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            Delete Recipe?
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>
                                                            Are you sure you want to permanently delete{" "}
                                                            <strong>{recipe.recipeName}</strong>?

                                                            <br />
                                                            <br />

                                                            This action cannot be undone.
                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteRecipe(recipe._id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete Recipe
                                                        </AlertDialogAction>

                                                    </AlertDialogFooter>

                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}