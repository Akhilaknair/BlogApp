import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  // adding filter feature

  const [menu, setmenu] = useState("All");

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  // whenever  component gets loaded

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setmenu("All")}
          className={
            menu === "All"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setmenu("Fitness")}
          className={
            menu === "Fitness"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          Fitness
        </button>
        <button
          onClick={() => setmenu("Nutrition")}
          className={
            menu === "Nutrition"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          Nutrition
        </button>
        <button
          onClick={() => setmenu("MentalHealth")}
          className={
            menu === "MentalHealth"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          MentalHealth
        </button>
        <button
          onClick={() => setmenu("Tips&Remedies")}
          className={
            menu === "Tips&Remedies"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          Tips&Remedies
        </button>
        <button
          onClick={() => setmenu("Meditation")}
          className={
            menu === "Meditation"
              ? "bg-orange-600 text-white px-5 py-1 rounded-sm"
              : ""
          }
        >
          Meditation
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-14 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item._id}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
