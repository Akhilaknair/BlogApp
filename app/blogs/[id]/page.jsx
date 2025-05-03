"use client";
//import { blog_data } from "@/Assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { asset } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";
const page = ({ params }) => {
  const [data, setData] = useState(null);

  // funcn to fetch data

  const fetchBlogData = async () => {
    // to hit api
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  //  useEffect to call arrow funcn when component gets loaded
  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-orange-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={asset.logo}
              width={90}
              alt=""
              className="w-[100px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 bg-white border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={asset.arrow} width={10} alt="" />
          </button>
        </div>

        <div className="my-24 text-center">
          <h1 className="font-semibold text-2xl sm:text-5xl  max-w-[750px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-7 border border-white rounded-full"
            src={data.authorImg}
            width={100}
            height={100}
            alt=""
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto  mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        />
       


       <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}></div>
        
        
        

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media platform
          </p>
          <div className="flex">
            <Image src={asset.fb_icon} alt="" width={20} />
            <Image src={asset.globe} alt="" width={20} />
            <Image className="ml-1" src={asset.insta_icon} alt="" width={20} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
