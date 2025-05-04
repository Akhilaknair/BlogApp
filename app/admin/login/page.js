"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast("Successfully Logged In !");
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  // // Handle Logout
  // const handleLogout = async () => {
  //   const res = await fetch("/api/admin/logout", {
  //     method: "GET", // Logout is a GET request
  //   });

  //   if (res.ok) {
  //     router.push("/admin/login"); 
  //   } else {
  //     alert("Something went wrong with logout");
  //   }
  // };

  return (
    <div className="flex items-center justify-center bg-orange-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
