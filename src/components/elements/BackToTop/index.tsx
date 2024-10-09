import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiSolidChevronsUp } from "react-icons/bi";

export default function BackToTopElement() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Link
      href={"#home"}
      className={`h-12 w-12 p-0.5 bg-gradient-to-br from-color-1 to-color-2 rounded-full fixed bottom-5 right-5 ${
        isVisible ? "scale-100" : "scale-0"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="bg-primary active:bg-transparent hover:bg-transparent duration-300 rounded-full text-white size-full text-2xl flex justify-center items-center">
        <BiSolidChevronsUp />
      </div>
    </Link>
  );
}
