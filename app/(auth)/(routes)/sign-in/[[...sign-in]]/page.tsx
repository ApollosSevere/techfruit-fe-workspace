// import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   return <SignIn />;
// }

// pages/signin.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/authService/authServiceEndpoints";
import { redirect } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading, isSuccess, error }] = useLoginMutation();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Signing up with:", { email, password });
    // Perform the SignUp logic here, such as sending a request to your backend

    // TODO: add enum for roles on front end boi! Maybe this can be done with the auto generate jawn
    loginUser({ email, password });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      redirect("/");
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        {/* Add your Sign In form here */}
        <form>
          {/* Form fields go here */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          Do not have an account?{" "}
          <Link href="/sign-up">
            <div className="text-blue-500">Sign Up</div>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
