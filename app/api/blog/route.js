import { ConnectDB } from "@/lib/config/db";
const { NextResponse } = require("next/server");
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const fs = require("fs"); // fs lib to delete post img and author img from the public folder

// ----- Database connection
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageByteData);

  const imagePath = `./public/${timestamp}_${image.name}`;
  await writeFile(imagePath, imageBuffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const authorImg = formData.get("authorImg");
  let authorImgUrl = "/profile_icon.jpg"; 

  if (authorImg && authorImg.name) {
    const authorImgByteData = await authorImg.arrayBuffer();
    const authorImgBuffer = Buffer.from(authorImgByteData);
    const authorImgPath = `./public/${timestamp}_author_${authorImg.name}`;
    await writeFile(authorImgPath, authorImgBuffer);
    authorImgUrl = `/${timestamp}_author_${authorImg.name}`;
  }

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: imgUrl, 
    authorImg: authorImgUrl, 
    date: new Date(),
  };

  await BlogModel.create(blogData);

  return NextResponse.json({ success: true, msg: "Blog added" });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  if (blog.image) {
    fs.unlink(`./public${blog.image}`, () => {});
  }

  if (blog.authorImg && blog.authorImg !== "/profile_icon.jpg") {
    fs.unlink(`./public${blog.authorImg}`, () => {});
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ msg: "Blog Deleted" });
}
