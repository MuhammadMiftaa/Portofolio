import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkPreview } from "@/components/ui/link-preview";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Popover } from "flowbite-react";
import React from "react";
import { RiCodeSSlashFill } from "react-icons/ri";

export default function ContactLayout() {
  return (
    <div className="h-[50rem] pt-16 pb-14 px-24 w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
      <div className="w-fit mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent">
        <AnimatedGradientTextWithoutBorder className="">
          <span
            className={cn(
              `text-5xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Let's Connect
          </span>
        </AnimatedGradientTextWithoutBorder>
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <form className="w-full font-urbanist">
        <LabelInputContainer className="mb-4">
          <Label className="text-xl font-light" htmlFor="namr">
            Name
          </Label>
          <Input className="text-lg" id="namr" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-xl font-light" htmlFor="email">
            Email Address
          </Label>
          <Input className="text-lg" id="email" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-xl font-light" htmlFor="subject">
            Subject
          </Label>
          <Input className="text-lg" id="subject" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-xl font-light" htmlFor="message">
            Your message
          </Label>
          <Textarea className="text-lg" id="message" rows={5} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Send message
          <BottomGradient />
        </button>

        {/* <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}

        {/* <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-300 text-sm">GitHub</span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-300 text-sm">Google</span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-300 text-sm">OnlyFans</span>
              <BottomGradient />
            </button>
          </div> */}
      </form>
      <div className="mt-16 flex justify-between w-full z-10 text-slate-300">
        <h1 className="font-urbanist italic font-light">
          Design Inspired by{" "}
          <Popover content={content} trigger="hover">
            <span className="font-bold cursor-pointer hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-color-1 hover:to-color-2 duration-300 hover:duration-300 text-white">
              them.
            </span>
          </Popover>
        </h1>
        <h2 className="font-urbanist font-light">
          Copyright @ 2024.{" "}
          <span className="text-white font-bold">Muhammad Mifta</span>
        </h2>
      </div>
    </div>
  );
}

const content = (
  <div className="text-sm bg-black py-1 px-2">
    <p className="font-bold font-poppins">
      <LinkPreview className="text-white" url="https://www.yusufs.me/" imageSrc="/inspired1.png" isStatic={true}>
        Yusuf Saputra
      </LinkPreview>
      ,{" "}
      <LinkPreview className="text-white"
        url="https://www.vickyadrii.my.id/"
        imageSrc="/inspired2.png"
        isStatic={true}
      >
        Vicky Herdiansyah Adri
      </LinkPreview>
      , and{" "}
      <LinkPreview className="text-white" url="https://aafrzl.my.id/" imageSrc="/inspired3.png" isStatic={true}>
        Afrizal Mufriz Fouji
      </LinkPreview>
    </p>
  </div>
);

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-[3px] w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-[3px] w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
