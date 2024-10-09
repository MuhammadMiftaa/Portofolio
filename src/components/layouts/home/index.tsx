import { HoverEffect } from "@/components/ui/card-hover-effect";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function HomeLayout() {
  return (
    <div className="pt-64 flex flex-col w-full h-screen" id="home">
      <div className="flex flex-col w-full items-center px-20">
        <h1 className="text-left font-poppins w-fit pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-6xl font-semibold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Hello, I'm
        </h1>
        <GradualSpacing
          className="font-display text-center text-4xl font-bold -tracking-widest text-white md:text-7xl md:leading-[5rem]"
          text="Muhammad   Miftakul   Salam"
        />
        <NeonGradientCard className="max-w-sm mt-8 items-center justify-center text-center text-white font-poppins text-xl">
          Frontend Web Developer
        </NeonGradientCard>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Github",
    icon: <FaGithub className="text-white w-6 h-6" />,
    link: "https://github.com/MuhammadMiftaa",
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedin className="text-white w-6 h-6" />,
    link: "https://www.linkedin.com/feed/",
  },
  {
    title: "Gmail",
    icon: <BiLogoGmail className="text-white w-6 h-6" />,
    link: "mailto:miftakulsalam99@gmail.com",
  },
];
