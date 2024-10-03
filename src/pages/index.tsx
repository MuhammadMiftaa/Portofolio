import { RainbowButton } from "@/components/ui/rainbow-button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";

export default function Home() {
  return (
    <>
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
