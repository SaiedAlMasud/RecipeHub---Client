"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async (searchValue = "") => {
        try {
            const tokenData = await authClient.token();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/transactions?search=${encodeURIComponent(searchValue)}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.data.token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to load transactions.");
                return;
            }

            setTransactions(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load transactions.");

        } finally {

            setLoading(false);

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
                            Transactions
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Total Transactions: {transactions.length}
                        </p>

                    </div>

                    <input
                        type="text"
                        placeholder="Search by email or transaction..."
                        value={search}
                        onChange={(e) => {
                            const value = e.target.value;

                            setSearch(value);

                            fetchTransactions(value);
                        }}
                        className="w-80 rounded-xl border bg-white px-4 py-3 outline-none focus:border-orange-500"
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
                                    Amount
                                </th>

                                <th className="text-left">
                                    Date
                                </th>

                                <th className="text-left">
                                    Status
                                </th>

                                <th className="text-left">
                                    Transaction ID
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {transactions.map((payment) => (

                                <tr
                                    key={payment._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5">
                                        {payment.customerEmail}
                                    </td>

                                    <td className="font-semibold text-green-600">
                                        ${payment.amount}
                                    </td>

                                    <td>
                                        {new Date(
                                            payment.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                            {payment.paymentStatus}
                                        </span>

                                    </td>

                                    <td className="max-w-xs truncate">
                                        {payment.paymentIntentId}
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