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
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Experience",
      link: "/experience",
      icon: (
        <FaRegFileCode className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <RiAppsFill className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <FloatingNav
      className="from-color-1 to-color-2 bg-gradient-to-r font-poppins backdrop-blur-2xl"
      navItems={navItems}
    />
  );
}
