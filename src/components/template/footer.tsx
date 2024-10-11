import { Popover } from "flowbite-react";
import React from "react";
import { LinkPreview } from "../ui/link-preview";

export default function Footer() {
  const content = (
    <div className="text-sm bg-black py-1 px-2">
      <p className="font-bold font-poppins">
        <LinkPreview
          className="text-white"
          url="https://www.yusufs.me/"
          imageSrc="/footer-img/inspired1.png"
          isStatic={true}
        >
          Yusuf Saputra
        </LinkPreview>
        ,{" "}
        <LinkPreview
          className="text-white"
          url="https://www.vickyadrii.my.id/"
          imageSrc="/footer-img/inspired2.png"
          isStatic={true}
        >
          Vicky Herdiansyah Adri
        </LinkPreview>
        , and{" "}
        <LinkPreview
          className="text-white"
          url="https://aafrzl.my.id/"
          imageSrc="/footer-img/inspired3.png"
          isStatic={true}
        >
          Afrizal Mufriz Fouji
        </LinkPreview>
      </p>
    </div>
  );

  return (
    <div className="text-sm md:text-base mt-16 flex flex-col md:flex-row items-center justify-between w-full z-10 text-slate-300">
      <h1 className="font-urbanist italic font-light">
        Design Inspired by{" "}
        <Popover content={content} trigger="hover">
          <span className="font-bold cursor-pointer hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-color-1 hover:to-color-2 duration-300 hover:duration-300 text-white">
            Their Unique Style.
          </span>
        </Popover>
      </h1>
      <h2 className="font-urbanist font-light">
        Created by <span className="text-white font-bold">Muhammad Mifta.</span>{" "}
        Copyright @ 2024.
      </h2>
    </div>
  );
}
