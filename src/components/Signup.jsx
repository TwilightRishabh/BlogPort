import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* ✅ Apple-style minimal card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* ✅ Centered Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="70px" />
        </div>

        <h2 className="text-center text-3xl font-semibold text-gray-900">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline transition-colors"
          >
            Log In
          </Link>
        </p>

        {/* ✅ Show error if any */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="John Appleseed"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: true })}
          />

          {/* ✅ Apple-like button */}
          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
