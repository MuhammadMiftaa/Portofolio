"use client";

import HomeLayout from "@/components/layouts/home";
import NavbarLayout from "@/components/layouts/navbar";

export default function Home() {
  return (
    <div className="bg-primary h-[400vh]">
      <NavbarLayout />
      <HomeLayout />
    </div>
  );
}
