import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import { BorderBeam } from "@/components/ui/border-beam";
import Pill from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/ProjectType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import useSWR from "swr";

export default function ProjectsLayout() {
  // FETCH PROJECTS DATA ⚽
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/project", fetcher);
  useEffect(() => {
    if (data) {
      setProjects(data.data);
    }
  });
  // FETCH PROJECTS DATA ⚽

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");

  return (
    <div
      id="projects"
      className={`pt-6 mt-10 ${
        activeModal ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <AnimatedGradientTextWithoutBorder className="">
        <span
          className={cn(
            `text-3xl sm:text-4xl md:text-6xl py-1.5 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          My Projects
        </span>
      </AnimatedGradientTextWithoutBorder>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-12 justify-stretch px-6 md:px-16 mt-5 overflow-hidden">
        {projects.map((item, idx) => (
          <div
            data-aos={(idx + 1) % 2 === 0 ? "fade-up-left" : "fade-up-right"}
            data-aos-duration="1000"
            data-aos-delay={((idx + 2) % 2) * 200}
            key={idx}
            className="h-[30rem] md:h-full md:aspect-square relative overflow-hidden border border-gray-700 pt-8 pl-8"
            style={{ borderRadius: "0 2rem 0 2rem" }}
          >
            <h1 className="font-urbanist font-bold text-2xl md:text-4xl text-slate-200 w-full inline-block">
              {item.title}
            </h1>
            <p className="font-urbanist text-slate-500 text-sm md:text-base mt-1 md:mt-2 pr-8 line-clamp-3 md:line-clamp-2 ">
              {item.description}
            </p>
            <div className="flex gap-1 md:gap-2 mt-2 sm:mt-1 md:mt-4 font-light pr-8 flex-wrap">
              {item.techStack.map((tech, idx) => (
                <Pill tech={tech} idx={idx} />
              ))}
            </div>

            <div className="absolute top-0 w-full h-[30rem] md:h-[33rem]">
              <a
                className="text-white text-3xl bottom-7 md:bottom-2 right-16 md:right-14 absolute hover:text-color-1 duration-300"
                href={item.url}
              >
                <FaLink />
              </a>
              <a
                className="text-white text-3xl bottom-7 md:bottom-2 right-28 md:right-[6.5rem] absolute hover:text-color-2 duration-300"
                href={item.githubLink}
              >
                <FaGithub />
              </a>

              <div
                className={`absolute w-fit bottom-24 md:bottom-16 right-12 md:right-14 cursor-pointer                   ${item.webViewImage ? "block" : "hidden"}`}
                onClick={() => {
                  setActiveModal(true);
                  setActiveImage(item.webViewImage);
                }}
              >
                <div className="relative mx-auto border-[#3C3C3D] bg-[#3C3C3D] border-[5px] md:border-[8px] rounded-t-xl h-[115px] max-w-[201px] md:h-[172px] md:max-w-[301px] ">
                  <div className="rounded-lg overflow-hidden h-[104px] md:h-[156px] bg-[#3C3C3D]">
                    <Image
                      width={500}
                      height={500}
                      src={item.webViewImage}
                      className="h-[104px] md:h-[156px] w-full rounded-lg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="relative mx-auto bg-[#1e1e1e] rounded-b-xl rounded-t-sm h-[11px] md:h-[17px] w-[234px] md:w-[351px]">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[37px] md:w-[56px] h-[3px] md:h-[5px] bg-[#3C3C3D]"></div>
                </div>
              </div>

              <div
                className={`absolute w-fit -left-1 md:left-5 bottom-16 md:bottom-2 cursor-pointer ${
                  item.mobileViewImage ? "block" : "hidden"
                }`}
                onClick={() => {
                  setActiveModal(true);
                  setActiveImage(item.mobileViewImage);
                }}
              >
                <div className="relative border-[#3C3C3D] bg-[#3C3C3D] border-[4.5px] md:border-[7px] rounded-[1rem] h-[200px] md:h-[300px] w-[100px] md:w-[150px] shadow-xl">
                  <div className="h-[6px] w-[49px] md:h-[9px] md:w-[74px] bg-[#3C3C3D] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[15px] w-[1px] md:h-[23px] md:w-[1.5px] bg-[#3C3C3D] absolute -start-[6px] md:-start-[8px] top-[41px] md:top-[62px] rounded-s-lg"></div>
                  <div className="h-[15px] w-[1px] md:h-[23px] md:w-[1.5px] bg-[#3C3C3D] absolute -start-[6px] md:-start-[8px] top-[59px] md:top-[89px] rounded-s-lg"></div>
                  <div className="h-[20px] w-[1px] md:h-[32px] md:w-[1.5px] bg-[#3C3C3D] absolute -end-[6px] md:-end-[8px] top-[47px] md:top-[71px] rounded-e-lg"></div>
                  <div className="rounded-[.6rem] overflow-hidden w-[91px] h-[191px] md:w-[136px] md:h-[286px] bg-white dark:bg-[#3C3C3D]">
                    <Image
                      height={500}
                      width={500}
                      src={item.mobileViewImage}
                      className={`w-[91px] h-[191px] md:w-[136px] md:h-[286px] duration-300`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <BorderBeam
              colorFrom="#FF00AA"
              colorTo="#00FFF1"
              size={250}
              duration={12}
              delay={9}
            />
            <BorderBeam
              colorFrom="#FF00AA"
              colorTo="#00FFF1"
              size={250}
              duration={12}
              delay={27}
            />
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          setActiveModal(false);
          setActiveImage("");
        }}
        className={`flex justify-center items-center backdrop-blur-sm fixed inset-0 duration-100 overflow-hidden ${
          activeModal ? "opacity-100 z-50" : "opacity-0 -z-10"
        }`}
      >
        <Image
          onClick={(event) => event.stopPropagation()}
          className={`${
            activeModal ? "scale-100" : "scale-0"
          } w-[90%] h-auto sm:w-auto sm:h-[80%] md:h-[90%] object-cover md:w-auto duration-300 ease-in-out border border-gray-950`}
          style={{ boxShadow: "0 0 10px 5px rgba(0,0,0,0.5)" }}
          src={activeImage}
          alt="zoom-image"
          width={500}
          height={500}
        />
        <div
          className="p-3 text-white absolute top-2 right-2 md:top-4 md:right-4 cursor-pointer text-2xl md:text-base"
          onClick={() => {
            setActiveModal(false);
            setActiveImage("");
          }}
        >
          <RiCloseLargeFill />
        </div>
      </div>
    </div>
  );
}
