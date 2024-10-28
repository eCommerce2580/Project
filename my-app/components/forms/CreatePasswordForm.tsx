// components/CreatePasswordForm.tsx
"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";

export default function CreatePasswordForm() {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleCreatePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/create-password", { password });
      if (response.status === 200) {
        setMessage("Password set successfully!");
      }
    } catch (error) {
      setMessage("Error setting password. Try again.");
    }
  }

  return (
    <form onSubmit={handleCreatePassword} className="my-5">
      <h2 className="text-xl font-semibold mb-3">Create Your Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        className="p-2 border rounded w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Set Password
      </button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
  );
}
