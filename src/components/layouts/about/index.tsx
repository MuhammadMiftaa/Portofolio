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
import useSWR from "swr";
import { CertificateType } from "@/types/CertificateType";
import { TechType } from "@/types/TechType";
import NumberTickerContainer from "@/components/template/number-ticker-container";

export default function AboutLayout() {
  let fetcher = async (url: string) => fetch(url).then((res) => res.json());

  // FETCH DATA CERTIFICATE 🥽
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const { data: dataCertificate, isLoading: isLoadingCertificate } = useSWR(
    "/api/certificate",
    fetcher
  );
  useEffect(() => {
    if (dataCertificate) {
      setCertificates(dataCertificate.data);
    }
  }, [dataCertificate]);
  // FETCH DATA CERTIFICATE 🥽

  // FETCH DATA TECH 🥽
  const [tech, setTech] = useState<TechType[]>([]);
  const { data: dataTech, isLoading: isLoadingTech } = useSWR(
    "/api/tech",
    fetcher
  );
  useEffect(() => {
    if (dataTech) {
      setTech(dataTech.data);
    }
  }, [dataTech]);
  // FETCH DATA TECH 🥽

  // FETCH DATA GITHUB ⚽
  type GithubContributionType = {
    title: string;
    value: number;
  };

  const [githubContributions, setGithubContributions] = useState<
    GithubContributionType[]
  >([]);

  useEffect(() => {
    FetchGithub().then((res) => {
      const githubData = res.data;
      const githubContributionsArray: GithubContributionType[] = [];

      githubContributionsArray.push({
        title: "Total",
        value:
          githubData.contributionsCollection.contributionCalendar
            .totalContributions,
      });

      githubContributionsArray.push({
        title: "This Week",
        value: githubData.contributionsCollection.contributionCalendar.weeks[
          githubData.contributionsCollection.contributionCalendar.weeks.length -
            1
        ].contributionDays.reduce(
          (acc: number, curr: any) => acc + curr.contributionCount,
          0
        ),
      });

      let bestDay = 0;
      githubData.contributionsCollection.contributionCalendar.weeks.forEach(
        (week: any) => {
          week.contributionDays.forEach((day: any) => {
            if (day.contributionCount > bestDay) {
              bestDay = day.contributionCount;
            }
          });
        }
      );
      githubContributionsArray.push({ title: "Best Day", value: bestDay });

      githubContributionsArray.push({
        title: "Average",
        value: Math.ceil(
          githubData.contributionsCollection.contributionCalendar
            .totalContributions / 365
        ),
      });

      setGithubContributions(githubContributionsArray);
    });
  }, []);
  // FETCH DATA GITHUB ⚽

  return (
    <div
      className="pt-6 sm:my-10 md:my-16 overflow-hidden w-full flex flex-col"
      id="about"
    >
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
        <div
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="relative"
        >
          <p className="text-white w-full text-sm sm:text-base md:text-lg text-justify tracking-wide font-urbanist mt-2 md:mt-5">
            I am a Junior Web Developer with expertise in both Frontend and Backend development. I specialize in modern technologies like JavaScript, TypeScript, React, Laravel, and Golang. With experience in database such as MySQL, PostgreSQL, Redis, and MongoDB, I am passionate about building efficient, scalable, and user-friendly web solutions. I am continuously learning and committed to improving my skills to stay ahead in the ever-evolving field of web development.
          </p>
          <div className="flex flex-col">
            <h1 className="text-slate-400 font-urbanist italic mt-2 md:mt-5 mb-1.5 text-sm sm:text-base w-full text-center sm:text-start mr-10 md:mr-0">
              Technologies I Work With
            </h1>
            <div className="flex gap-2 items-center w-full justify-center sm:justify-start mr-10 md:mr-0">
              {tech.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl overflow-hidden w-10 h-10 ${
                    item.name === "NextJS" || item.name === "Github"
                      ? "invert"
                      : ""
                  }`}
                >
                  <Image
                    className="w-full h-full"
                    src={item.logo}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col items-center md:items-start"
      >
        <div className="flex w-full justify-between items-center  mt-8">
          <AnimatedGradientTextWithoutBorder className="md:ml-[6.5rem]">
            <span
              className={cn(
                `text-lg sm:text-xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Training and Certification
            </span>
          </AnimatedGradientTextWithoutBorder>
          <Link href={"/certificate"} className="p-0.5 bg-gradient-to-r from-color-1 to-color-2 rounded-[0.9rem] mr-32 cursor-pointer hover:p-0 duration-500">
            <h1 className="py-2 px-5 rounded-xl bg-primary text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950 duration-700 font-urbanist">
              Explore
            </h1>
          </Link>
        </div>
        <div className="relative flex w-full md:w-[88%] mx-auto flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl after:content-[''] after:bg-gradient-to-r after:from-primary after:from-50% after:to-transparent after:w-10 md:after:w-32 after:h-36 md:after:h-32 after:absolute after:left-0 before:content-[''] before:bg-gradient-to-l before:from-primary before:from-50% before:to-transparent before:w-10 md:before:w-32 before:h-36 md:before:h-32 before:absolute before:right-0 before:z-10">
          <Marquee
            pauseOnHover
            className="[--duration:200s] md:[--duration:320s]"
          >
            {certificates.map((item, idx) => (
              <figure
                key={idx}
                className={cn(
                  "relative w-64 md:w-96 cursor-pointer overflow-hidden rounded-xl border px-7 py-5",
                  "border-gray-500 bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent font-poppins"
                )}
              >
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <figcaption className="text-xs md:text-sm font-medium text-white line-clamp-1">
                      {item.title}
                    </figcaption>
                  </div>
                </div>
                <p className="text-[0.7rem] font-light text-white/40 mt-6">
                  Valid until: {item.validUntil ? item.validUntil : "—"}
                </p>
                <p className="text-[0.7rem] font-light text-white/40 line-clamp-1">
                  {item.program}
                </p>
              </figure>
            ))}
          </Marquee>
        </div>
      </div>
      <div className="px-6 sm:px-16 md:px-36">
        <div
          data-aos="zoom-in"
          data-aos-duration="800"
          className="text-white text-xl sm:text-2xl md:text-3xl font-poppins flex items-center my-3 uppercase font-bold gap-[1px] tracking-wide"
        >
          <h1>Github C</h1>
          <Link href={"https://github.com/MuhammadMiftaa"}>
            <FaGithub className="rotate-45 hover:rotate-0 duration-500" />
          </Link>
          <h1 className="tracking-wide">ntributions —</h1>
        </div>

        <div className="flex justify-stretch gap-2 md:gap-5 w-full my-5">
          {githubContributions.map((item, idx) => (
            <NumberTickerContainer
              title={item.title}
              value={item.value}
              idx={idx}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div
            data-aos="zoom-in"
            data-aos-duration="800"
            className="text-gray-200 font-light font-poppins bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent p-4 border border-gray-500 rounded-xl w-[100%]"
          >
            <GithubCalendar username="MuhammadMiftaa" />
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="100"
            className="flex flex-row md:flex-col bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-transparent to-transparent border border-gray-500 rounded-xl justify-around items-center w-full content-center"
          >
            <CardContainer
              className="flex flex-col items-center cursor-pointer"
              containerClassName="py-4"
            >
              <CardBody className="relative group/card h-10 w-full">
                <CardItem translateZ={200} className="w-full">
                  <Link
                    href={"https://www.codewars.com/users/MuhammadMiftaa"}
                    className="rounded-xl overflow-hidden w-fit"
                  >
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
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer
              className="flex flex-col items-center cursor-pointer"
              containerClassName="py-0"
            >
              <CardBody className="relative group/card h-10 w-full">
                <CardItem translateZ={200} className="w-full">
                  <Link href={"https://leetcode.com/u/muhammadmiftaa/"}>
                    <Image
                      className="w-[40px] rounded-xl"
                      src={"/leetcode.png"}
                      alt="leetcode-icon"
                      width={60}
                      height={60}
                    />
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
