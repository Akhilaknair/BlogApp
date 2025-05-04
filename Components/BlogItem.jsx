import React from "react";
import { asset } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
const BlogItem = ({ title, image, description, category, id }) => {
  return (
    <div className="max-w-[370px] sm:max-w-[360px] bg-white border border-black bg-orange-300 hover:shadow-[-7px_7px_0px_#000000]  bg-orange-200">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>
      <p className=" ml-35 px-1 bg-black font-bold text-white text-md text-center">
        {category}
      </p>
      <div className="p-5">
        <h5 className="text-lg font-medium mb-2 tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-4 tracking-tight text-sm text-gray-800"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <Link href={`/blogs/${id}`}>
          <div className="flex items-center py-2 font-semibold text-center">
            Read more
            <Image
              src={asset.arrow}
              className="ml-2"
              width={20}
              height={15}
              alt=""
            />{" "}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
