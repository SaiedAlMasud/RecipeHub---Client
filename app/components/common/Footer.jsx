"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GiThunderBlade } from "react-icons/gi";


export default function Footer() {
    return (
        <footer className="bg-[#111827] text-white">

            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Logo */}

                    <div>

                        <h2 className="bg-linear-to-r from-[#FF512F] via-[#F09819] to-[#FFD200] bg-clip-text text-4xl font-bold text-transparent">
                            RecipeHub
                        </h2>

                        <p className="mt-5 leading-7 text-gray-400">
                            Discover, share, and enjoy thousands of delicious
                            recipes from passionate home cooks and professional
                            chefs around the world.
                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold">
                            Quick Links
                        </h3>

                        <div className="space-y-3">

                            <Link
                                href="/"
                                className="block text-gray-400 transition hover:text-orange-400"
                            >
                                Home
                            </Link>

                            <Link
                                href="/recipes"
                                className="block text-gray-400 transition hover:text-orange-400"
                            >
                                Browse Recipes
                            </Link>

                            <Link
                                href="/featured"
                                className="block text-gray-400 transition hover:text-orange-400"
                            >
                                Featured Recipes
                            </Link>

                            <Link
                                href="/popular"
                                className="block text-gray-400 transition hover:text-orange-400"
                            >
                                Popular Recipes
                            </Link>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold">
                            Contact
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">

                                <Mail
                                    size={18}
                                    className="text-orange-400"
                                />

                                <span className="text-gray-400">
                                    support@recipehub.com
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Phone
                                    size={18}
                                    className="text-orange-400"
                                />

                                <span className="text-gray-400">
                                    +880 1234-567890
                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <MapPin
                                    size={18}
                                    className="text-orange-400"
                                />

                                <span className="text-gray-400">
                                    Dhaka, Bangladesh
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Social */}

                    <div>

                        <h3 className="mb-5 text-xl font-semibold">
                            Follow Us
                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-orange-500"
                            >
                                <FaFacebook size={20} />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-orange-500"
                            >
                                <BsInstagram size={20} />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-orange-500"
                            >
                                <BsTwitter size={20} />
                            </a>

                            <a
                                href="https://github.com"
                                target="_blank"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-orange-500"
                            >
                                <GiThunderBlade size={20} />
                            </a>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-14 border-t border-white/10 pt-8">

                    <p className="text-center text-sm text-gray-400">
                        © {new Date().getFullYear()} RecipeHub. All Rights
                        Reserved. Developed with ❤️ using Next.js &
                        MongoDB.
                    </p>

                </div>

            </div>

        </footer>
    );
}