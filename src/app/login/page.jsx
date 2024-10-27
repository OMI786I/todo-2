"use client";

import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize useForm

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : "/main",
    });

    console.log(data);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login with an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })} // Register input with validation
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}{" "}
                  {/* Display error message */}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })} // Register input with validation
                    className={`bg-gray-50 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}{" "}
                  {/* Display error message */}
                </div>
                <button type="submit" className="btn btn-info text-white">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do not have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const LoginWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Login />
  </Suspense>
);

export default LoginWrapper;
