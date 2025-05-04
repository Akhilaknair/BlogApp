import React, { useState } from "react";
import { asset } from "@/Assets/assets";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleGoToAdmin = () => {
    router.push("/admin"); 
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          {" "}
          <Image
            src={asset.logo}
            alt=""
            width={50}
            className="w-[130px] sm:w-auto"
          />
          <p className="center"> BlogApp</p>
        </div>
       
        <button
          onClick={handleGoToAdmin}
          className="flex items-center gap-1 font-medium py-1 px-3 sm:py-3 sm:px-4 border border-solid border-black shadow-[-7px_7px_0px_#000000] bg-orange-200"
        >
          Add Blogs
          <Image src={asset.arrow} width={10} alt="Arrow Icon" />
        </button>
      </div>

      <div className="text-center my-1">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-5 max-w-[740px] m-auto text-xs sm:text-base">
          A health-related blog app offering comprehensive resources for
          fitness, nutrition, lifestyle, remedies, and meditation. It provides
          personalized workout plans, healthy recipes, natural remedies, stress
          management tips, and guided meditation sessions, helping users
          optimize their physical and mental well-being. Stay motivated and
          achieve a balanced, healthier life with this all-in-one click.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email to Subscribe"
            className="pl-4 outline-none"
          ></input>
          <button
            type="submit"
            className="border-l border-black px-4 py-4 sm:px-8 active:bg-gray-600 "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
