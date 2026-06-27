"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function AdminReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async (searchValue = "") => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/reports?search=${encodeURIComponent(searchValue)}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            setReports(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReport = async (reportId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${reportId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to delete report.");
                return;
            }

            toast.success(data.message);

            fetchReports(search);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete report.");
        }
    };

    // Delete Reported Recipe
    const handleDeleteRecipe = async (reportId) => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/reports/${reportId}/recipe`,
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

            fetchReports(search);
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
                            Manage Reports
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Total Reports: {reports.length}
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => {
                            const value = e.target.value;

                            setSearch(value);

                            fetchReports(value);
                        }}
                        className="w-80 rounded-xl border bg-white px-4 py-3 outline-none focus:border-[#FF6B35]"
                    />

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                    <table className="w-full">

                        <thead className="bg-orange-50">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Recipe
                                </th>

                                <th className="text-left">
                                    Reporter
                                </th>

                                <th className="text-left">
                                    Owner
                                </th>

                                <th className="text-left">
                                    Reason
                                </th>

                                <th className="text-left">
                                    Date
                                </th>

                                <th className="text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {reports.map((report) => (

                                <tr
                                    key={report._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5 font-medium">
                                        {report.recipeName}
                                    </td>

                                    <td>
                                        {report.reporterEmail}
                                    </td>

                                    <td>
                                        {report.recipeOwnerEmail}
                                    </td>

                                    <td>
                                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                                            {report.reportReason}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(
                                            report.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-2">

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
                                                        Delete Recipe
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            Delete Reported Recipe?
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>
                                                            Are you sure you want to permanently delete
                                                            <strong>{report.recipeName} </strong>
                                                            from RecipeHub?

                                                            <br />
                                                            <br />

                                                            This will also remove all reports associated with this recipe.
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteRecipe(report._id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete Recipe
                                                        </AlertDialogAction>

                                                    </AlertDialogFooter>

                                                </AlertDialogContent>
                                            </AlertDialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600">
                                                        Delete Report
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            Delete Report?
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this report?

                                                            <br />
                                                            <br />

                                                            The recipe will remain available. Only the report will be removed.
                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteReport(report._id)}
                                                            className="bg-orange-600 hover:bg-orange-700"
                                                        >
                                                            Delete Report
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