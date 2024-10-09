"use client";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import ShineBorder from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "@/components/ui/marquee";
import GithubCalendar from "react-github-calendar";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { GlareCard } from "@/components/ui/glare-card";
import { FetchGithub } from "@/services/github";
import { FaGithub } from "react-icons/fa";
import NumberTicker from "@/components/ui/number-ticker";
import Link from "next/link";

export default function AboutLayout() {
  const [githubData, setGithubData] = useState<any>({});
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [thisWeekContributions, setThisWeekContributions] = useState<number>(0);
  const [bestDayContributions, setBestDayContributions] = useState<number>(0);
  const [averageContributions, setAverageContributions] = useState<number>(0);

  useEffect(() => {
    FetchGithub().then((res) => {
      const githubData = res.data;
      const totalContributions =
        githubData.contributionsCollection.contributionCalendar
          .totalContributions;

      setGithubData(githubData);
      setTotalContributions(totalContributions);

      // Hitung kontribusi minggu ini
      const weeks =
        githubData.contributionsCollection.contributionCalendar.weeks;
      const lastWeekContributions = weeks[
        weeks.length - 1
      ].contributionDays.reduce(
        (acc: number, curr: any) => acc + curr.contributionCount,
        0
      );
      setThisWeekContributions(lastWeekContributions);

      // Hitung kontribusi terbaik (best day)
      let bestDay = 0;
      weeks.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          if (day.contributionCount > bestDay) {
            bestDay = day.contributionCount;
          }
        });
      });
      setBestDayContributions(bestDay);

      // Hitung rata-rata kontribusi per hari (asumsi 365 hari)
      setAverageContributions(totalContributions / 365);
    });
  }, []);

  return (
    <div className="pt-6 sm:my-10 md:my-16 overflow-hidden w-full flex flex-col" id="about">
      <AnimatedGradientText className="md:ml-36 px-20 md:px-10 py-1 md:py-1.5 mx-auto">
        <span
          className={cn(
            `text-md sm:text-xl md:text-2xl py-1 font-poppins font-bold inline animate-gradient bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent bg-gradient-to-r from-color-1 via-color-2 to-color-1 `
          )}
        >
          About me
        </span>
      </AnimatedGradientText>
      <div className="mx-5 md:px-[9.1rem] w-full bg-primary flex flex-col items-center pr-10 md:flex-row gap-5 md:gap-20 mt-10 md:mt-16">
        <GlareCard className="flex flex-col items-center justify-center h-[8.5rem] w-[8.5rem] md:w-full md:h-full">
          <ShineBorder
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
            color={["#00FFF1", "#FF00AA"]}
          >
            <Image
              className="aspect-square object-cover h-28 w-28 md:h-52 md:w-52 rounded-xl"
              src={"/profile-picture.jpg"}
              alt="profile-picture"
              width={800}
              height={800}
            ></Image>
          </ShineBorder>
        </GlareCard>
        <div data-aos="fade-left" data-aos-delay="300" data-aos-duration="1000" className="relative">
          <p className="text-white w-full text-sm sm:text-base md:text-lg text-justify tracking-wide font-urbanist mt-2 md:mt-5">
            I am a Frontend Web Developer with 1 year of experience. I am a
            self-taught developer who is passionate about making the web a
            better place. I have experience working with modern frontend
            technologies like React, NextJS, and TailwindCSS. I am always eager
            to learn new things and improve my skills.
          </p>
          <div className="flex flex-col">
            <h1 className="text-slate-400 font-urbanist italic mt-2 md:mt-5 mb-1.5 text-sm sm:text-base w-full text-center sm:text-start mr-10 md:mr-0">
              Technologies I Work With
            </h1>
            <div className="flex gap-2 items-center w-full justify-center sm:justify-start mr-10 md:mr-0">
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/javascript.svg"}
                  alt="javascript-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/typescript.svg"}
                  alt="typescript-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/tailwindcss.svg"}
                  alt="tailwindcss-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/react.svg"}
                  alt="react-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/nextjs.svg"}
                  alt="nextjs-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/postgresql.svg"}
                  alt="postgresql-icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="rounded-xl overflow-hidden w-10 h-10">
                <Image
                  className="w-full h-full"
                  src={"/mongodb.svg"}
                  alt="mongodb-icon"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          {/* <button className="font-poppins absolute bottom-5 right-0 inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <AnimatedGradientTextWithoutBorder>
              <span
                className={cn(
                  `text-lg font-urbanist inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                )}
              >
                Contact me
              </span>
            </AnimatedGradientTextWithoutBorder>
          </button> */}
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="1000" className="flex flex-col items-center">
        <AnimatedGradientTextWithoutBorder className="md:ml-[6.5rem] mt-8">
          <span
            className={cn(
              `text-lg sm:text-xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Training and Certification
          </span>
        </AnimatedGradientTextWithoutBorder>
        <div className="relative flex w-full md:w-[88%] mx-auto flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl after:content-[''] after:bg-gradient-to-r after:from-primary after:from-50% after:to-transparent after:w-10 md:after:w-32 after:h-36 md:after:h-32 after:absolute after:left-0 before:content-[''] before:bg-gradient-to-l before:from-primary before:from-50% before:to-transparent before:w-10 md:before:w-32 before:h-36 md:before:h-32 before:absolute before:right-0 before:z-10">
          <Marquee pauseOnHover className="[--duration:60s] md:[--duration:120s]">
            {firstRow.map((item, idx) => (
              <figure
                key={idx}
                className={cn(
                  "relative w-64 md:w-96 cursor-pointer overflow-hidden rounded-xl border px-7 py-5",
                  "border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent font-poppins"
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <figcaption className="text-xs md:text-sm font-medium text-white">
                      {item.provider}
                    </figcaption>
                  </div>
                </div>
                <p className="text-[0.7rem] font-light text-white/40 mt-6">
                  Valid until: {item.validUntil}
                </p>
                <p className="text-[0.7rem] font-light text-white/40">
                  {item.title}
                </p>
              </figure>
            ))}
          </Marquee>
        </div>
      </div>
      <div className="px-6 sm:px-16 md:px-36">
        <div data-aos="zoom-in" data-aos-duration="800" className="text-white text-xl sm:text-2xl md:text-3xl font-poppins flex items-center my-3 uppercase font-bold gap-[1px] tracking-wide">
          <h1>Github C</h1>
          <Link href={"https://github.com/MuhammadMiftaa"}>
            <FaGithub className="rotate-45 hover:rotate-0 duration-500" />
          </Link>
          <h1 className="tracking-wide">ntributions —</h1>
        </div>

        <div className="flex justify-stretch gap-2 md:gap-5 w-full my-5">
          <div data-aos="zoom-in" data-aos-duration="800" className="aspect-square md:h-40 w-full border border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent rounded-xl flex items-center justify-center relative ">
            <p className="text-gray-400 font-urbanist text-xs sm:text-base md:text-lg absolute top-2 left-2">
              Total
            </p>
            <NumberTicker
              className="text-white font-poppins text-3xl sm:text-4xl md:text-6xl pt-3 tracking-tight"
              value={totalContributions}
            />
          </div>
          <div data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100" className="aspect-square md:h-40 w-full border border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent rounded-xl flex items-center justify-center relative">
            <p className="text-gray-400 font-urbanist text-xs sm:text-base md:text-lg absolute top-2 left-2">
              This Week
            </p>
            <NumberTicker
              className="text-white font-poppins text-3xl sm:text-4xl md:text-6xl pt-3 tracking-tight"
              value={thisWeekContributions}
            />
          </div>
          <div data-aos="zoom-in" data-aos-duration="800" data-aos-delay="200" className="aspect-square md:h-40 w-full border border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent rounded-xl flex items-center justify-center relative">
            <p className="text-gray-400 font-urbanist text-xs sm:text-base md:text-lg absolute top-2 left-2">
              Best Day
            </p>
            <NumberTicker
              className="text-white font-poppins text-3xl sm:text-4xl md:text-6xl pt-3 tracking-tight"
              value={bestDayContributions}
            />
          </div>
          <div data-aos="zoom-in" data-aos-duration="800" data-aos-delay="300" className="aspect-square md:h-40 w-full border border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent rounded-xl flex items-center justify-center relative">
            <p className="text-gray-400 font-urbanist text-xs sm:text-base md:text-lg absolute top-2 left-2">
              Average
            </p>
            <NumberTicker
              className="text-white font-poppins text-3xl sm:text-4xl md:text-6xl pt-3 tracking-tight"
              value={averageContributions}
            />
            <span className="text-gray-400 text-sm sm:text-base md:text-xl font-urbanist pt-8">
              /day
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div data-aos="zoom-in" data-aos-duration="800" className="text-gray-200 font-light font-poppins bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent p-4 border border-gray-500 rounded-xl w-[100%]">
            <GithubCalendar username="MuhammadMiftaa" />
          </div>
          <div data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100" className="flex flex-row md:flex-col bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent border border-gray-500 rounded-xl justify-around items-center w-full content-center">
            <CardContainer
              className="flex flex-col items-center cursor-pointer"
              containerClassName="py-4"
            >
              <CardBody className="relative group/card h-10 w-full">
                <CardItem translateZ={200} className="w-full">
                  <div className="rounded-xl overflow-hidden w-fit">
                    <svg
                      className="rounded-xl w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#b71c1c"
                        d="M40,42H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32c1.105,0,2,0.895,2,2v32	C42,41.105,41.105,42,40,42z"
                      ></path>
                      <circle cx="24" cy="24" r="2" fill="#212121"></circle>
                      <path
                        fill="#212121"
                        d="M23.567,24.25c-1.715-2.042-2.079-5.328-0.696-7.901c0.648-1.302,1.715-2.398,2.96-3.178 c1.272-0.724,2.745-1.2,4.232-1.155c2.978-0.03,5.855,1.768,7.146,4.359c1.351,2.566,1.037,5.811-0.651,7.875l-0.866-0.499 c0.797-2.167,0.492-4.461-0.652-6.124c-1.148-1.652-3.038-2.675-4.979-2.632c-1.919,0.003-3.818,1.005-4.923,2.66 c-1.139,1.65-1.445,3.903-0.706,6.095L23.567,24.25z"
                      ></path>
                      <path
                        fill="#212121"
                        d="M24,24.5c-2.626,0.464-5.654-0.863-7.19-3.348c-0.804-1.212-1.219-2.685-1.272-4.153 c0.009-1.464,0.333-2.977,1.116-4.243c1.463-2.594,4.459-4.186,7.348-4.009c2.898,0.113,5.551,2.007,6.495,4.502L29.63,13.75 c-1.478-1.773-3.617-2.657-5.629-2.497c-2.005,0.168-3.836,1.293-4.769,2.995c-0.957,1.664-1.038,3.809-0.157,5.593 c0.859,1.811,2.658,3.203,4.925,3.658V24.5z"
                      ></path>
                      <path
                        fill="#212121"
                        d="M24.433,24.25c-0.911,2.506-3.574,4.464-6.495,4.553c-1.451,0.09-2.935-0.286-4.232-0.975 c-1.263-0.74-2.412-1.777-3.117-3.088c-1.514-2.564-1.396-5.955,0.202-8.368c1.547-2.453,4.514-3.804,7.146-3.374l0.001,1 c-2.275,0.393-4.11,1.804-4.977,3.627c-0.857,1.82-0.798,3.968,0.21,5.628c0.963,1.661,2.779,2.804,4.765,2.933 c1.998,0.162,4.103-0.7,5.631-2.436L24.433,24.25z"
                      ></path>
                      <path
                        fill="#212121"
                        d="M24.433,23.75c1.715,2.042,2.079,5.328,0.696,7.901c-0.648,1.302-1.715,2.398-2.96,3.178 c-1.272,0.724-2.745,1.2-4.232,1.155c-2.978,0.03-5.855-1.768-7.146-4.359c-1.351-2.566-1.037-5.811,0.651-7.875l0.866,0.499 c-0.797,2.167-0.492,4.461,0.652,6.124c1.148,1.652,3.038,2.675,4.979,2.632c1.919-0.003,3.818-1.005,4.923-2.66 c1.139-1.65,1.445-3.903,0.706-6.095L24.433,23.75z"
                      ></path>
                      <path
                        fill="#212121"
                        d="M24,23.5c2.626-0.464,5.654,0.863,7.19,3.348c0.804,1.212,1.219,2.685,1.272,4.153 c-0.009,1.464-0.333,2.977-1.116,4.243c-1.463,2.594-4.459,4.186-7.348,4.009c-2.898-0.113-5.551-2.007-6.495-4.502l0.866-0.501 c1.478,1.773,3.617,2.657,5.629,2.497c2.005-0.168,3.836-1.293,4.769-2.995c0.957-1.664,1.038-3.809,0.157-5.593 C28.066,26.347,26.267,24.955,24,24.5V23.5z"
                      ></path>
                      <path
                        fill="#212121"
                        d="M23.567,23.75c0.911-2.506,3.574-4.464,6.495-4.553c1.451-0.09,2.935,0.286,4.232,0.975 c1.263,0.74,2.412,1.777,3.117,3.088c1.514,2.564,1.396,5.955-0.202,8.368c-1.547,2.453-4.514,3.804-7.146,3.374l-0.001-1 c2.275-0.393,4.11-1.804,4.977-3.627c0.857-1.82,0.798-3.968-0.21-5.628c-0.963-1.661-2.779-2.804-4.765-2.933 c-1.998-0.162-4.103,0.7-5.631,2.436L23.567,23.75z"
                      ></path>
                    </svg>
                  </div>
                </CardItem>
                {/* <h1 className="-mt-1.5 font-urbanist text-gray-300 font-light text-[.6rem] text-center">
                  Codewars
                </h1> */}
              </CardBody>
            </CardContainer>
            <CardContainer
              className="flex flex-col items-center cursor-pointer"
              containerClassName="py-0"
            >
              <CardBody className="relative group/card h-10 w-full">
                <CardItem translateZ={200} className="w-full">
                  <Image
                    className="w-[40px] rounded-xl"
                    src={"/leetcode.png"}
                    alt="leetcode-icon"
                    width={60}
                    height={60}
                  />
                </CardItem>
                {/* <h1 className="font-urbanist text-gray-300 font-light text-[.6rem] text-center">
                  Leetcode
                </h1> */}
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export const firstRow = [
  {
    provider: "Participate in Udemy Online Course",
    title: "React - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
  {
    provider: "Participate in Udemy Online Course",
    title: "NextJS - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
  {
    provider: "Participate in Udemy Online Course",
    title: "TailwindCSS - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
  {
    provider: "Participate in Udemy Online Course",
    title: "JavaScript - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
  {
    provider: "Participate in Udemy Online Course",
    title: "CSS - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
  {
    provider: "Participate in Udemy Online Course",
    title: "HTML - The Complete Guide",
    date: "2021",
    validUntil: "2022",
  },
];
