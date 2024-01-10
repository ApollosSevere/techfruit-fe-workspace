// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
//   return <SignUp />;
// }

// pages/signup.js
// "use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/authService/authServiceEndpoints";
import { redirect } from "next/navigation";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [registerUser, { isLoading, isSuccess, error }] = useRegisterMutation();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Signing up with:", { email, password });
    // Perform the SignUp logic here, such as sending a request to your backend

    // TODO: add enum for roles on front end boi! Maybe this can be done with the auto generate jawn
    registerUser({
      firstName,
      lastName,
      email,
      password,
      role: isChecked ? "TEACHER" : "USER",
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      redirect("/");
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {/* Add your Sign Up form here */}
        <form>
          {/* Form fields go here */}
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First name
            </label>
            <input
              type="first_name"
              id="first_name"
              name="first_name"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Last name
            </label>
            <input
              type="last_name"
              id="last_name"
              name="last_name"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
            />
          </div>

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

          <div className="flex items-center mb-4">
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-500 text-indigo-600 border-gray-300"
            />
            <label
              htmlFor="myCheckbox"
              className="ml-2 block text-sm text-gray-500 text-sm font-bold"
            >
              Register as Instructor
            </label>
          </div>

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/sign-in">
            <div className="text-blue-500">Sign In</div>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
