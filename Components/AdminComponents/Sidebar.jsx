
import Image from "next/image";
import { asset } from "@/Assets/assets";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-orange-200">
      <div className="px-4 flex items-center sm:pl-14 py-1 border border-black">
        <Image src={asset.logo} width={100} height={10} alt="" />
        BlogApp
      </div>

      <div className="w-full sm:w-80 h-[100vh] relative py-12">
        <div className="w-[90%] sm:w-[80%] absolute right-0">
          <Link
            href="/admin/addProduct"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={asset.add_icon} alt="" width={28} />
            <p>Add Blogs</p>
          </Link>

          <Link
            href="/admin/blogList"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={asset.blog_icon} alt="" width={28} />
            <p>Blog Lists</p>
          </Link>

          <Link
            href="/admin/subscriptions"
            className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]"
          >
            <Image src={asset.email_icon} alt="" width={28} />
            <p>Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
