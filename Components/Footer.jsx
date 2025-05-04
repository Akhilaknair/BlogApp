import { asset } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 py-5 sm:flex-row items-center bg-orange-500">
      <div className="flex items-center justify-center ">
        {" "}
        <Image src={asset.logo} width={50} height={50} alt="" />
        Blogger
      </div>
      <p className="text-sm text-black">
        All right reserved. Copyright @blogger
      </p>
      <div className="flex">
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
  );
};

export default Footer;
