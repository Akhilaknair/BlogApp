"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { asset } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const fetchBlogData = async (id) => {
    const response = await axios.get("/api/blog", {
      params: { id },
    });
    setData(response.data);
  };

  const id = React.use(params)?.id;

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
    if (id) {
      fetchBlogData(id);
    }
  }, [id]);

  return data ? (
    <>
      <div className="min-h-screen bg-orange-200 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div className="py-6 px-4 md:px-12 lg:px-24 xl:px-36">
          <div className="flex justify-between items-center flex-wrap gap-y-2">
            <Link href="/">
              <Image
                src={asset.logo}
                width={50}
                height={25}
                alt="Logo"
                className="w-[100px] sm:w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
            
              <button
                onClick={() => setLiked((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-white shadow-[-3px_3px_0px_#000000] hover:shadow-none transition duration-200"
                aria-label="Like"
              >
                <Image
                  src={liked ? asset.unlike : asset.like}
                  width={20}
                  height={20}
                  alt="Like"
                />
              </button>

              <button
                onClick={() => setSaved((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-white shadow-[-3px_3px_0px_#000000] hover:shadow-none transition duration-200"
                aria-label="Save"
              >
                <Image
                  src={saved ? asset.unsave : asset.save}
                  width={20}
                  height={20}
                  alt="Save"
                />
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-white shadow-[-3px_3px_0px_#000000] hover:shadow-none transition duration-200"
                aria-label="Toggle Theme"
              >
                <Image
                  src={theme === "light" ? asset.moon : asset.sun}
                  width={20}
                  height={20}
                  alt="Toggle Theme"
                />
              </button>
            </div>
          </div>

          <div className="my-20 text-center px-4">
            <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight max-w-4xl mx-auto">
              {data.title}
            </h1>
            <Image
              className="mx-auto mt-6 border-4 border-white rounded-full shadow-md"
              src={data.authorImg}
              width={100}
              height={100}
              alt="Author"
            />
            <p className="mt-2 text-base sm:text-lg text-gray-700 dark:text-gray-300">
              {data.author}
            </p>
          </div>
        </div>

        <div className="mx-5 md:mx-10 lg:mx-auto max-w-4xl -mt-24 mb-16 px-4">
          <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] mb-8">
            <Image
              className="rounded-lg border-4 border-white object-cover"
              src={data.image}
              alt="Blog banner"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>

          <div
            className="blog-content text-base sm:text-lg leading-relaxed text-gray-800 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>

          <div className="my-20">
            <p className="text-black dark:text-white font-semibold mb-4">
              Share this article on social media:
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
              >
                <Image src={asset.fb_icon} alt="Facebook" width={20} />
              </a>

              <a
                href="https://www.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
              >
                <Image src={asset.globe} alt="Website" width={20} />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
              >
                <Image
                  className="ml-1"
                  src={asset.insta_icon}
                  alt="Instagram"
                  width={20}
                />
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  ) : null;
};

export default Page;
