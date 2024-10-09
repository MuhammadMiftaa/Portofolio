import { FloatingNav } from "@/components/ui/floating-navbar";
import React from "react";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { RiAppsFill } from "react-icons/ri";
import { FaRegFileCode } from "react-icons/fa";

export default function NavbarLayout() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-5 w-5 text-black" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-5 w-5 text-black" />,
    },
    {
      name: "Experience",
      link: "#experience",
      icon: (
        <FaRegFileCode className="h-5 w-5 text-black" />
      ),
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <RiAppsFill className="h-5 w-5 text-black" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-5 w-5 text-black" />
      ),
    },
  ];
  return (
    <FloatingNav
      className="from-color-1 to-color-2 overflow-hidden bg-gradient-to-r font-poppins backdrop-blur-2xl"
      navItems={navItems}
    />
  );
}
