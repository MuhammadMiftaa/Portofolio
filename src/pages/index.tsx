"use client";

import HomeLayout from "@/components/layouts/home";
import NavbarLayout from "@/components/layouts/navbar";
import AboutLayout from "@/components/layouts/about";
import ExperienceLayout from "@/components/layouts/experience";

export default function Home() {
  return (
    <div className="bg-primary">
      <NavbarLayout />
      <HomeLayout />
      <AboutLayout />
      <ExperienceLayout />
    </div>
  );
}
