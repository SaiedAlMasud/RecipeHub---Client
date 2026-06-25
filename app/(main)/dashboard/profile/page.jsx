"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const tokenData = await authClient.token();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.data.token}`,
                },
            }
        );

        const data = await response.json();

        setProfile(data);
        setFormData({
            name: data.name || "",
            image: data.image || "",
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/profile`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (result.modifiedCount > 0) {
                toast.success("Profile updated successfully.");

                await fetchProfile();
            } else {
                toast("No changes detected.");
            }
        } catch (error) {
            console.error(error);

            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!profile) {
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
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50 p-6">
            <div className="mx-auto max-w-5xl space-y-8">
                {/* Heading */}
                <div>
                    <h1 className="text-4xl font-bold">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your RecipeHub account.
                    </p>
                </div>

                {/* Top Card */}
                {/* Top Card */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                    {/* Cover */}
                    <div className="h-40 bg-linear-to-r from-[#FF6B35] to-[#FF9F1C]" />

                    {/* User */}
                    <div className="relative px-8 pb-8">
                        <div className="-mt-16 flex flex-col md:flex-row md:items-end md:gap-8">
                            {/* Avatar */}
                            <Image
                                src={
                                    profile?.image && profile.image.trim() !== ""
                                        ? profile.image
                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            profile?.name || "User"
                                        )}&background=FF6B35&color=fff`
                                }
                                alt={profile?.name || "User"}
                                width={128}
                                height={128}
                                className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />

                            {/* User Info */}
                            <div className="mt-5 md:mt-0 md:pb-1">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {profile.name}
                                </h2>

                                <p className="mt-1 text-gray-500">
                                    {profile.email}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 capitalize">
                                        {profile.role}
                                    </span>

                                    {profile.isPremium ? (
                                        <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                                            ⭐ Premium Member
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700">
                                            Free User
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h3 className="text-gray-500">
                            Recipes
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-[#FF6B35]">
                            0
                        </p>
                    </div>

                    <div className="rounded-2xl border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h3 className="text-gray-500">
                            Favorites
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-[#FF6B35]">
                            0
                        </p>
                    </div>

                    <div className="rounded-2xl border-0 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h3 className="text-gray-500">
                            Purchased
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-[#FF6B35]">
                            0
                        </p>
                    </div>
                </div>

                {/* Update Profile */}
                <div className="rounded-3xl border-0 bg-white p-8 shadow-xl">
                    <h2 className="mb-6 text-2xl font-bold">
                        Update Profile
                    </h2>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <Label className="mb-2 block font-medium">
                                Name
                            </Label>

                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3 outline-none focus:border-[#FF6B35]"
                            />
                        </div>

                        <div>
                            <Label className="mb-2 block font-medium">
                                Email
                            </Label>

                            <Input
                                defaultValue={profile.email}
                                disabled
                                className="w-full rounded-xl bg-gray-100 p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Profile Image URL
                            </label>

                            <Input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3 outline-none focus:border-[#FF6B35]"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full rounded-xl bg-linear-to-r from-[#FF6B35] to-[#FF9F1C] text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-[#e55a2b] hover:to-[#e88f16]"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}