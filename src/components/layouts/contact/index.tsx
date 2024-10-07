import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

export default function ContactLayout() {
  return (
    <div className="flex py-10 px-24">
      <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <AnimatedGradientTextWithoutBorder className="">
          <span
            className={cn(
              `text-4xl py-1 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Let's Connect
          </span>
        </AnimatedGradientTextWithoutBorder>
        <form className="my-8 font-urbanist">
          <LabelInputContainer className="mb-4">
            <Label className="text-xl font-light" htmlFor="namr">Name</Label>
            <Input className="text-lg" id="namr" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label className="text-xl font-light" htmlFor="email">Email Address</Label>
            <Input className="text-lg" id="email" type="email" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label className="text-xl font-light" htmlFor="subject">Subject</Label>
            <Input className="text-lg" id="subject" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label className="text-xl font-light" htmlFor="message">Your message</Label>
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
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-color-1 to-transparent" />
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
