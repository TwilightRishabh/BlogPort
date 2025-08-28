import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* ✅ Clean Apple-style card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* ✅ Minimal Logo on top */}
        <div className="flex justify-center mb-6">
          <Logo width="70px" />
        </div>

        <h2 className="text-center text-3xl font-semibold text-gray-900">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </p>

        {/* ✅ Show error only if exists */}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        {/* ✅ Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
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
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
