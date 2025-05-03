"use client";
import { asset } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Fitness",
    author: "",
    authorImg: "/profile_icon.jpg",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  // blog -> route.js have assoc blogData
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    //api-url & formdata

    const response = await axios.post("/api/blog", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Fitness",
        author: "",
        authorImg: "/profile_icon.jpg",
      });
    } else {
      toast.error("error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="imageupload">
          <Image
            className="mt-4"
            src={!image ? asset.upload_area : URL.createObjectURL(image)}
            width={70}
            height={50}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="imageupload"
          hidden
        />

        <p className="text-xl mt-4">Author Name</p>
        <input
          name="author"
          onChange={onChangeHandler}
          value={data.author}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-orange-100"
          type="text"
          placeholder="Enter here ..."
          required
        />

        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-orange-100"
          type="text"
          placeholder="Enter here ..."
          required
        />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border bg-orange-100"
          type="text"
          placeholder="Write content here ..."
          rows={6}
          required
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-orange-500"
        >
          <option value="Fitness">Fitness</option>
          <option value="LifeStyle">LifeStyle</option>
          <option value="Meditation">Meditation</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Tips&Remedies">Remedies</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-5 w-40 h-10 bg-orange-700 text-white"
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
