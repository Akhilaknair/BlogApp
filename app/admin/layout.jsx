"use client";
import { asset } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/admin/logout", {
      method: "GET",
    });

    if (res.ok) {
      toast("Logged Out !");
      router.push("/admin/login");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row">
      
        <Sidebar />
        <ToastContainer theme="dark" />

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between m-5 flex-col sm:flex-row">
            <h3 className="font-medium text-lg text-center sm:text-left">
              👋 Welcome to the Admin Panel, Login To Manage Blogs.
            </h3>

            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <Image
                src={asset.admin_dp}
                width={60}
                alt="Profile Icon"
                className="rounded-full"
              />

              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="m-5 sm:m-10">{children}</div>
        </div>
      </div>
    </>
  );
}
