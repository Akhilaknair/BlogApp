import { ConnectDB } from "@/lib/config/db";
const { NextResponse } = require("next/server");
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";


const fs=require('fs')//fs lib to dlete post img from public folder


// /////------db connection

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

/// --------api using custom header functions to get all blogs
export async function GET(request) {
  // console.log("Blog GET hit!");

  // to get data from blogModel

  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }

  // return NextResponse.json({ msg: "Api working" });
}

///----creating api to store blog data
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  ////---to make img store in public folder
  const path = `./public/${timestamp}_${image.name}`;

  await writeFile(path, buffer);

  ///-----to access img in blog app
  const imgUrl = `/${timestamp}_${image.name}`;
  console.log(imgUrl);

  /////now getting other datas

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  //////using blogdata to store in our database BlogModel

  await BlogModel.create(blogData);

  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog added" });
}



//api to delete blog

export async function DELETE(request){
     const id=await request.nextUrl.searchParams.get('id')
     const blog=await BlogModel.findById(id)
     fs.unlink(`./public${blog.image}`,()=>{})
     await BlogModel.findByIdAndDelete(id)
     return NextResponse.json({msg:"Blog Deleted"})
}