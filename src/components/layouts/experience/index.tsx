import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function ExperienceLayout() {
  return (
    <div className="py-20">
      <AnimatedGradientText className="ml-36">
        <span
          className={cn(
            `text-2xl py-1 font-poppins font-bold inline animate-gradient bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent bg-gradient-to-r from-color-1 via-color-2 to-color-1 `
          )}
        >
          Experience
        </span>
      </AnimatedGradientText>
      <div className="flex flex-col px-36 mt-16">
        <div className="relative py-4 px-6 flex h-fit w-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-background md:shadow-xl">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <div className="bg-white rounded-full w-fit h-fit">
                <Image
                  className="h-16 w-16 rounded-full"
                  src={"/ruangguru.png"}
                  alt="company-image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="font-poppins text-slate-200">
                <h1 className="font-bold text-xl">
                  PT. Ruang Raya Indonesia (Ruangguru)
                </h1>
                <h2 className="text-slate-500">Fullstack Golang & AI</h2>
              </div>
            </div>
            <h3 className="text-slate-500 font-poppins justify-self-stretch mt-2">
              Sep 2024 - Dec 2024
            </h3>
          </div>
          <div className="flex gap-2 mt-4 font-light">
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              HTML&CSS
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              Golang
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              AI
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              Javascript
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              React
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              GORM
            </span>
            <span className="bg-[#272729] font-poppins text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ">
              PostgreSQL
            </span>
          </div>
          <div>
            <h4 className="text-gray-500 font-bold font-poppins my-5">
              The responsibilities include:
            </h4>
            <ul className="text-sm font-light text-gray-300 font-poppins list-disc px-4 leading-6">
              <li>
                Develop web applications using ReactJS, HTML, CSS, and
                JavaScript, with an understanding of Single Page Applications
                and responsive design.
              </li>
              <li>
                Implement version control using Git and GitHub, including
                handling merge requests and managing projects in repositories.
              </li>
              <li>
                Build and manage RESTful APIs with HTTP methods, while
                understanding response codes and authentication.
              </li>
              <li>
                Use Golang for application development, including CRUD
                operations, debugging, and integration with PostgreSQL
                databases.
              </li>
              <li>
                Deploy applications to hosting services like Netlify, Vercel, or
                GitHub Pages, and understand the production build process.
              </li>
            </ul>
          </div>
          <BorderBeam colorFrom="#FF00AA" colorTo="#00FFF1" size={250} duration={12} delay={9} />
          <BorderBeam colorFrom="#FF00AA" colorTo="#00FFF1" size={250} duration={12} delay={27} />
        </div>
      </div>
    </div>
  );
}