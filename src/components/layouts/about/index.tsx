"use client"
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import ShineBorder from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

export default function AboutLayout() {
  const theme = useTheme();
  return (
    <div>
      <AnimatedGradientText className="ml-36">
        <span
          className={cn(
            `text-4xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          About me
        </span>
      </AnimatedGradientText>
      <div className="h-screen px-48 w-full bg-primary flex gap-20 mt-20">
        <div className="relative h-56">
          <p className="text-white font-urbanist mt-5">
            I am a Frontend Web Developer with 1 year of experience. I am a
            self-taught developer who is passionate about making the web a
            better place. I have experience working with modern frontend
            technologies like React, NextJS, and TailwindCSS. I am always eager
            to learn new things and improve my skills.
          </p>
          <button className="font-poppins absolute bottom-0 left-0 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Contact me
          </button>
        </div>
        <ShineBorder
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
          color={["#00FFF1", "#FF00AA"]}
        >
          <Image
            className="aspect-square object-cover h-52 w-52"
            src={"/profile-picture.jpg"}
            alt="profile-picture"
            width={800}
            height={800}
          ></Image>
        </ShineBorder>
      </div>
    </div>
  );
}
