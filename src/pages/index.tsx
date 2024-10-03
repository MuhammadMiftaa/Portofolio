"use client"
import { RainbowButton } from "@/components/ui/rainbow-button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
      <RainbowButton>Get Unlimited Access</RainbowButton>
      <TypewriterEffectSmooth
        words={[
          {
            text: "Build",
          },
          {
            text: "awesome",
          },
          {
            text: "apps",
          },
          {
            text: "with",
          },
          {
            text: "Aceternity.",
            className: "text-blue-500 dark:text-blue-500",
          },
        ]}
      />
    </>
  );
}
