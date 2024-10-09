import { HoverEffect } from "@/components/ui/card-hover-effect";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HomeLayout() {
  return (
    <div
      className="pt-56 pb-24 md:pt-64 flex flex-col w-full md:h-screen"
      id="home"
    >
      <div
        // data-aos="fade-up"
        // data-aos-duration="2000"
        className="flex flex-col w-full items-center px-20"
      >
        <motion.h1
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-left text-xl sm:text-4xl md:text-6xl font-poppins w-fit pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text font-semibold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
        >
          Hello, I'm
        </motion.h1>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <GradualSpacing
            className="font-display text-center text-2xl sm:text-5xl md:text-7xl font-bold -tracking-[0.2em] sm:-tracking-[0.12em] md:-tracking-widest text-white md:leading-[5rem] text-wrap"
            text="Muhammad   Miftakul   Salam"
          />
        </motion.div>
          <NeonGradientCard className="w-full sm:max-w-md md:max-w-sm mt-4 sm:mt-6 md:mt-8 items-center justify-center text-center text-white font-poppins">
            <h1 className="text-xs sm:text-lg md:text-xl text-nowrap py-0.5 px-2 md:p-0">
              Frontend Web Developer
            </h1>
          </NeonGradientCard>
      </div>
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Github",
    icon: <FaGithub className="text-white w-4 h-4 md:w-6 md:h-6" />,
    link: "https://github.com/MuhammadMiftaa",
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedin className="text-white w-4 h-4 md:w-6 md:h-6" />,
    link: "https://www.linkedin.com/feed/",
  },
  {
    title: "Gmail",
    icon: <BiLogoGmail className="text-white w-4 h-4 md:w-6 md:h-6" />,
    link: "mailto:miftakulsalam99@gmail.com",
  },
];
