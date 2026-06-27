"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/?loggedIn=true",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google Login Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      const session = await authClient.getSession({
        query: {
          disableCookieCache: true,
        },
      });

      const user = session.data?.user;

      if (user?.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/?loggedIn=true");
      }


    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg border-0 shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-500">
          <ChefHat className="h-8 w-8 text-white" />
        </div>

        <CardTitle className="text-3xl font-bold">
          Welcome Back
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Login to continue exploring delicious recipes.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-5"
        >
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
                className="absolute right-3 top-3"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full"
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

          <p className="text-center text-sm">
            Don`&apos`t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-orange-600 hover:underline"
            >
              Register
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

          {/* Google */}

          <Button
            type="button"
            variant="outline"
            className="flex h-11 w-full items-center justify-center gap-3 hover:cursor-pointer hover:text-orange-500"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={22} />

            Continue with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}