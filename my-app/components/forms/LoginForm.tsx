"use client";

import React, { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const credential = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (credential?.ok) {
        console.log("Login successful");
      } else {
        console.log("Login failed", credential?.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;

    const values = {
      email: target.email.value,
      password: target.password.value,
      name: target.userName.value,
    };

    try {
      const response = await axios.post("/api/register", values);

      if (response.status === 200) {
        const credential = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (credential?.ok) {
          console.log("Registration and login successful");
        } else {
          console.log("Registration succeeded but login failed");
        }
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/forgotPassword", { email });

      if (response.status === 200) {
        alert("Password reset link sent to your email.");
        setIsForgotPassword(false);
      } else {
        console.log("Error sending password reset email.");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
    }
  }

  return (
    <div className="flex flex-col w-full justify-center items-center my-5">
      {!isForgotPassword ? (
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="w-full"
        >
          <h1 className="text-center text-xl font-semibold mb-6">
            {isLogin ? "Login" : "Register"}
          </h1>
          {!isLogin && (
            <InputLogin
              label="Name"
              type="text"
              id="userName"
              name="userName"
              placeholder="Type Name"
            />
          )}
          <InputLogin
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Type Email"
          />
          <div className="mb-2 w-full">
            <label
              htmlFor="password"
              className="block w-[80%] mx-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500 transition-colors"
            />
            {/* Forgot Password Link right-aligned */}
            {isLogin && (
              <div className="w-[80%] mx-auto text-right mt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <div className="w-full flex justify-center items-center mt-6">
            <button
              type="submit"
              className="focus:outline-none w-[80%] text-white bg-blue-600 hover:bg-blue-700 
               focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
               transition-colors"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {/* Sign Up Link below button */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPassword} className="w-full">
          <h1 className="text-center text-xl font-semibold mb-6">Forgot Password</h1>
          <InputLogin
            label="Email"
            type="email"
            id="forgot-email"
            name="forgot-email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-full flex flex-col items-center gap-2">
            <button
              type="submit"
              className="focus:outline-none w-[80%] text-white bg-blue-600 hover:bg-blue-700 
               focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
               my-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
               transition-colors"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}

      <div className="w-full flex items-center justify-center my-4">
        <div className="border-t border-gray-300 w-[35%]"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 w-[35%]"></div>
      </div>

      <div className="flex w-full flex-col justify-center items-center">
        <button
          onClick={() => signIn("google")}
          className="flex w-[80%] items-center justify-center bg-white
           dark:bg-gray-900 border border-gray-300 rounded-lg 
           shadow-md px-6 py-2 text-sm font-medium text-gray-800
           dark:text-white hover:bg-gray-200 focus:outline-none 
           focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
           transition-all"
        >
          <FcGoogle className="h-6 w-6 mr-2" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

type InputLoginProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function InputLogin({ label, onChange, ...props }: InputLoginProps) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={props.id}
        className="block w-[80%] mx-auto mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...props}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          dark:focus:border-blue-500 transition-colors"
      />
    </div>
  );
}