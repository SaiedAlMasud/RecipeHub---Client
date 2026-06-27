"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
    Shield,
    Crown,
    User,
} from "lucide-react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import toast from "react-hot-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleMakeAdmin = async (userId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/role`,
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

            fetchUsers();

        } catch (error) {
            console.error(error);
            toast.error("Failed to update user.");
        }
    };

    const handleRemoveAdmin = async (userId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/remove-role`,
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

            fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user.");
        }
    };

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Manage Users
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Total Users: {users.length}
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80 rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#FF6B35]"
                    />
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                    <table className="w-full">

                        <thead className="bg-orange-50">
                            <tr>

                                <th className="px-6 py-4 text-left">
                                    User
                                </th>

                                <th className="text-left">
                                    Role
                                </th>

                                <th className="text-left">
                                    Premium
                                </th>

                                <th className="text-left">
                                    Status
                                </th>

                                <th className="text-center">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {filteredUsers.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <Image
                                                src={
                                                    user.image ||
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        user.name || "User"
                                                    )}`
                                                }
                                                alt={user.name}
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />

                                            <div>

                                                <h2 className="font-semibold">
                                                    {user.name}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    {user.email}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        {user.role === "admin" ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-700">
                                                <Shield className="h-4 w-4" />
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                                                <User className="h-4 w-4" />
                                                User
                                            </span>
                                        )}

                                    </td>

                                    <td>

                                        {user.isPremium ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                                                <Crown className="h-4 w-4" />
                                                Premium
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-gray-100 px-4 py-1 text-sm">
                                                Free
                                            </span>
                                        )}

                                    </td>

                                    <td>

                                        <span className="rounded-full bg-green-100 px-4 py-1 text-sm text-green-700">
                                            Active
                                        </span>

                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-3">

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        className={`rounded-lg px-4 py-2 text-white transition ${user.role === "admin"
                                                                ? "bg-amber-500 hover:bg-amber-600"
                                                                : "bg-blue-500 hover:bg-blue-600"
                                                            }`}
                                                    >
                                                        {user.role === "admin"
                                                            ? "Remove Admin"
                                                            : "Make Admin"}
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            {user.role === "admin"
                                                                ? "Remove Admin?"
                                                                : "Make Admin?"}
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>

                                                            {user.role === "admin"
                                                                ? (
                                                                    <>
                                                                        Are you sure you want to remove{" "}
                                                                        <strong>{user.name}</strong> administrator privileges?

                                                                        <br />
                                                                        <br />

                                                                        They will become a normal user.
                                                                    </>
                                                                )
                                                                : (
                                                                    <>
                                                                        Are you sure you want to promote{" "}
                                                                        <strong>{user.name}</strong> to
                                                                        administrator?

                                                                        <br />
                                                                        <br />

                                                                        They will have full administrative
                                                                        access to RecipeHub.
                                                                    </>
                                                                )}

                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                if (user.role === "admin") {
                                                                    handleRemoveAdmin(user._id);
                                                                } else {
                                                                    handleMakeAdmin(user._id);
                                                                }
                                                            }}
                                                        >
                                                            {user.role === "admin"
                                                                ? "Remove Admin"
                                                                : "Make Admin"}
                                                        </AlertDialogAction>

                                                    </AlertDialogFooter>

                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <button
                                                className="rounded-lg bg-red-500 px-4 py-2 text-white"
                                            >
                                                Delete
                                            </button>

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