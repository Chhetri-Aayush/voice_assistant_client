"use client";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { authClient } from "@/lib/authClient";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (error) throw new Error(error.message);

      toast.success("Account created successfully!", {
        style: { background: "#059669", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#059669" },
      });

      router.push("/chat");
    } catch (error) {
      toast.error("Sign up failed. Please try again.", {
        style: { background: "#ff4d4f", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#ff4d4f" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-soft-white flex items-center justify-center min-h-screen p-4">
      <main className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Fill in your details to get started
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 border-2 outline-none focus:border-primary-redwood text-gray-900 text-sm transition-colors"
                {...register("name", { required: "Username is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm text-center mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@gmail.com"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 border-2 outline-none focus:border-primary-redwood text-gray-900 text-sm transition-colors"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm text-center mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="block w-full px-4 py-3 rounded-lg border-gray-300 border-2 outline-none focus:border-primary-redwood text-gray-900 text-sm transition-colors"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm text-center mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 active:scale-75 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-primary-redwood hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
