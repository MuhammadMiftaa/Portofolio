"use client";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { List } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import useSWR from "swr";
import { ExperienceType } from "@/types/ExperienceType";

export default function ExperienceLayout() {
  // FETCH EXPERIENCE DATA ⚽
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/experience", fetcher);
  useEffect(() => {
    if (data) {
      setExperience(data.data);
    }
  }, [data]);
  // FETCH EXPERIENCE DATA ⚽

  return (
    <div className="pt-6 mt-10 overflow-hidden" id="experience">
      <AnimatedGradientText className="md:ml-36 px-20 md:px-10 py-1 md:py-1.5 mx-auto">
        <span
          className={cn(
            `text-md sm:text-xl md:text-2xl py-1 font-poppins font-bold inline animate-gradient bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent bg-gradient-to-r from-color-1 via-color-2 to-color-1 `
          )}
        >
          Experience
        </span>
      </AnimatedGradientText>
      <div className="flex flex-col px-6 sm:px-16 md:px-36 mt-10 md:mt-16">
        {experience.map((item, idx) => (
          <div
          data-aos={(idx + 1) % 2 === 0 ? "fade-up-right" : "fade-up-left"}
          data-aos-duration="1000"
          data-aos-delay={((idx + 2) % 2) * 200}
            key={idx}
            className="relative py-4 px-6 flex h-fit w-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-background md:shadow-xl"
          >
            <div className="flex justify-between flex-col md:flex-row">
              <div className="flex gap-5 items-center">
                <div className="bg-white rounded-full w-fit h-fit">
                  <Image
                    className="rounded-full sm:h-16 sm:w-16 "
                    src={item.companyLogo}
                    alt={item.company}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="font-urbanist text-slate-200">
                  <h1 className="font-bold text-xl">{item.company}</h1>
                  <h2 className="text-slate-500">{item.title}</h2>
                </div>
              </div>
              <h3 className="text-slate-200 md:text-slate-500 text-sm sm:text-base font-urbanist justify-self-stretch mt-3 w-full text-center md:w-fit ">
                {[
                  item.startDate.split(" ")[0],
                  item.startDate.split(" ")[1].slice(0, 3),
                  item.startDate.split(" ")[2],
                ].join(" ")}{" "}
                -
                {[
                  item.endDate.split(" ")[0],
                  item.endDate.split(" ")[1].slice(0, 3),
                  item.endDate.split(" ")[2],
                ].join(" ")}{" "}
              </h3>
            </div>
            <div className="flex gap-1 sm:gap-2 mt-4 font-light font-urbanist flex-wrap">
              {item.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-[#272729] text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 "
                >
                  {tech}
                </span>
              ))}
            </div>
            <div>
              <h4 className="text-gray-500 font-bold font-urbanist text-lg mt-5 mb-3">
                The responsibilities include:
              </h4>
              <List className="text-sm font-light text-gray-300 font-urbanist list-disc leading-6 tracking-wide">
                {item.jobdesk.map((job, idx) => (
                  <div key={idx}>
                    <List.Item icon={HiCheckCircle}>{job}</List.Item>
                  </div>
                ))}
              </List>
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
    </div>
  );
}
