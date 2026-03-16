"use client";

import dynamic from "next/dynamic";
import HomeLayout from "@/components/layouts/home";
import AboutLayout from "@/components/layouts/about";
import ExperienceLayout from "@/components/layouts/experience";
import ProjectsLayout from "@/components/layouts/projects";
import ContactLayout from "@/components/layouts/contact";
import SEO from "@/components/SEO";

const NavbarLayout = dynamic(() => import("@/components/layouts/navbar"), {
  ssr: false,
});
const BackToTopElement = dynamic(() => import("@/components/ui/back-to-top"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SEO />
      <div className="bg-primary">
        <NavbarLayout />
        <HomeLayout />
        <AboutLayout />
        <ExperienceLayout />
        <ProjectsLayout />
        <ContactLayout />
        <BackToTopElement />
      </div>
    </>
  );
}
