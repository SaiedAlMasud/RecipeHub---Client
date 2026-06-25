"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, ChefHat } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.error(error);
            toast.error("Google Sign Up Failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const image = form.image.value.trim();
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Validation

        if (!name || !email || !password) {
            toast.error("Please fill all required fields.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain one uppercase letter.");
            setLoading(false);
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain one lowercase letter.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                image,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            router.push("/?registered=true");
            
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg shadow-2xl border-0">
            <CardHeader className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-500">
                    <ChefHat className="h-8 w-8 text-white" />
                </div>

                <CardTitle className="text-3xl font-bold">
                    Create Account
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Join RecipeHub and share your delicious recipes.
                </p>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 px-5"
                >
                    {/* Name */}

                    <div className="space-y-2">
                        <Label>Name</Label>

                        <Input
                            name="name"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Email */}

                    <div className="space-y-2">
                        <Label>Email</Label>

                        <Input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    {/* Image */}

                    <div className="space-y-2">
                        <Label>Profile Image URL</Label>

                        <Input
                            name="image"
                            placeholder="https://example.com/profile.jpg"
                        />
                    </div>

                    {/* Password */}

                    <div className="space-y-2">
                        <Label>Password</Label>

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="********"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-3"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}

                    <div className="space-y-2">
                        <Label>Confirm Password</Label>

                        <div className="relative">
                            <Input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="********"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                className="absolute right-3 top-3"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Button */}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </Button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-orange-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>

                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign Up */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 flex items-center justify-center gap-3 hover:cursor-pointer hover:text-orange-400 "
                        onClick={handleGoogleSignUp}
                    >
                        <FcGoogle size={22} />
                        Continue with Google
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}